import { Buffs } from '@commonTypes/buffs';
import Detector from '@utils/detect/BuffDetector';

let loadFinished = false;
let pendingPromise: Promise<void> | null = null;

export function useTemplate(detector: Detector) {
  if (!pendingPromise) {
    pendingPromise = Promise.all(
      Buffs.map((buff) => detector.loadBuffIcon(buff)),
    ).then(() => {
      loadFinished = true;
    });
  }

  if (!loadFinished) throw pendingPromise;
}
