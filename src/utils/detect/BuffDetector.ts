import cv from '@techstark/opencv-js';

import Capture from './Capture';
import type { Buff, BuffName } from '@commonTypes/buffs';

interface DetectTemplate {
  template: cv.Mat;
  detectAll: boolean;
}

type DetectResult = {
  key: BuffName;
  matchCount: number;
}[];

export default class BuffDetector {
  private templates = new Map<BuffName, DetectTemplate>();

  capture = new Capture();
  threshold = 0.7;

  startCapture() {
    return this.capture.initialize();
  }

  async loadBuffIcon(name: BuffName, { url, detectAll }: Buff) {
    function loadImage(url: string) {
      const img = new Image();

      img.style.display = 'none';

      return new Promise<cv.Mat>((resolve, reject) => {
        img.addEventListener('load', () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0);
          resolve(cv.imread(canvas));
          img.remove();
        });

        img.addEventListener('error', (err) => {
          reject(err);
          img.remove();
        });

        img.src = url;
        document.body.appendChild(img);
      });
    }

    this.templates.set(name, {
      template: await loadImage(url),
      detectAll,
    });
  }

  detectBuffIcon(): DetectResult {
    const shot = this.capture.takeCapture();

    const detectResult: DetectResult = [];
    const src: cv.Mat | null = shot.roi(
      new cv.Rect((shot.cols * 2) / 3, 0, shot.cols / 3, 32 * 5),
    );

    for (const [key, { template, detectAll }] of this.templates.entries()) {
      const result = new cv.Mat();
      cv.matchTemplate(src, template, result, cv.TM_CCOEFF_NORMED as number);

      let matchCount = 0;

      let { maxVal, maxLoc } = cv.minMaxLoc(result);

      while (maxVal > this.threshold) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        result.floatPtr(maxLoc.y, maxLoc.x)[0] = 0;
        matchCount++;

        if (!detectAll) break;
        ({ maxVal, maxLoc } = cv.minMaxLoc(result));
      }

      if (matchCount > 0)
        detectResult.push({
          key,
          matchCount,
        });

      result.delete();
    }

    src?.delete();

    return detectResult;
  }
}
