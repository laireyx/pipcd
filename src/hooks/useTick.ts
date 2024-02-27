import runtimeParams from '@utils/runtimeParams';
import { useEffect, useState } from 'react';

export default function useTick() {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    // Force re-rendering this element
    setTimeout(() => setNow(Date.now()), runtimeParams.VIEW_FPS);
  }, [now]);
}
