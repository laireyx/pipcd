import { BuffName, Buffs } from '@commonTypes/buffs';
import Detector from '@utils/detect/BuffDetector';

let loadFinished = false;
let pendingPromise: Promise<void> | null = null;

export function useTemplate(detector: Detector) {
  if (!pendingPromise) {
    pendingPromise = Promise.all(
      Object.entries(Buffs).map(([name, buff]) =>
        detector.loadBuffIcon(name as BuffName, buff),
      ),
    ).then(() => {
      loadFinished = true;
    });
  }

  if (!loadFinished) throw pendingPromise;
}
