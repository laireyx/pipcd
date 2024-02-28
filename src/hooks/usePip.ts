import pipCanvas from '@utils/pipCanvas';
import runtimeParams from '@utils/runtimeParams';
import { useEffect } from 'react';
import { setInterval } from 'worker-timers';

export default function usePip() {
  useEffect(() => {
    const handler = setInterval(
      () => pipCanvas.update(),
      runtimeParams.VIEW_FPS,
    );

    return () => clearInterval(handler);
  }, []);
}
