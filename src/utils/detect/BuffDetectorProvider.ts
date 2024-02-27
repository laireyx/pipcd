import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useOpencvSuspense } from '@hooks/useOpencv';
import { useTemplate } from '@hooks/useTemplate';

import runtimeParams from '@utils/runtimeParams';

import BuffDetector from './BuffDetector';
import useCooldownStore from '@stores/cooldown';

import { clearInterval, setInterval } from 'worker-timers';

const DetectorContext = createContext<BuffDetector | null>(null);

export const DetectorProvider = DetectorContext.Provider;

export function useDetector() {
  const detector = useContext(DetectorContext);
  const [isCapturing, setIsCapturing] = useState(false);

  if (!detector)
    throw new Error('useDetector() failed: cannot retrieve detector instance');

  const { activate } = useCooldownStore();

  const startDetect = useCallback(async () => {
    if (!detector) return;

    await detector.startCapture();

    setIsCapturing(true);
  }, [detector, setIsCapturing]);

  useOpencvSuspense();
  useTemplate(detector);

  // Use double-checking because of `React.StrictMode`
  useEffect(() => {
    if (!isCapturing) return;

    const handler = setInterval(() => {
      const result = detector.detectBuffIcon();

      for (const { key, matchCount } of result) {
        switch (key) {
          case 'continuous':
            if (matchCount === 2) activate('continuous');
            break;
          default:
            activate(key);
            break;
        }
      }
    }, runtimeParams.CAPTURE_FPS);

    return () => clearInterval(handler);
  }, [detector, isCapturing, activate]);

  return startDetect;
}
