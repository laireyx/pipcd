import { BuffName, Buffs } from '@commonTypes/buffs';
import Detector from '@utils/detect/BuffDetector';
import runtimeParams from '@utils/runtimeParams';

let loadFinished = false;
let pendingPromise: Promise<void> | null = null;

export function useTemplate(detector: Detector) {
  if (!pendingPromise) {
    pendingPromise = Promise.all(
      Object.entries(Buffs).map(async ([name, buff]) => {
        if (!buff.boss && runtimeParams.BOSS) return;

        await detector.loadBuffIcon(name as BuffName, buff);
      }),
    ).then(() => {
      loadFinished = true;
    });
  }

  if (!loadFinished) throw pendingPromise;
}
