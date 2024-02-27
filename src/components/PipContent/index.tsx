import { BuffName } from '@commonTypes/buffs';
import CooldownIndicator from '@components/CooldownIndicator';
import useCooldownStore from '@stores/cooldown';
import pipElements from '@utils/pipElements';
import runtimeParams from '@utils/runtimeParams';
import html2canvas from 'html2canvas';
import { useEffect, useRef } from 'react';

import { setInterval } from 'worker-timers';
import { pipContent } from './index.css';

async function refreshPip(ref: React.RefObject<HTMLElement>) {
  if (ref.current) {
    const canvas = new OffscreenCanvas(
      ref.current.scrollWidth,
      ref.current.scrollHeight,
    );

    await html2canvas(ref.current, {
      x: 0,
      y: 0,
      canvas: canvas as unknown as HTMLCanvasElement,
      scale: 1,
      logging: false,
    });

    pipElements.update(canvas);
  }
}

export default function PipContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { activationLog } = useCooldownStore();

  useEffect(() => {
    const handler = setInterval(
      () => void refreshPip(containerRef),
      runtimeParams.VIEW_FPS,
    );
    return () => clearInterval(handler);
  }, []);

  return (
    <>
      <div ref={containerRef} className={pipContent}>
        {Object.keys(activationLog).map((buffName) => (
          <CooldownIndicator key={buffName} buffName={buffName as BuffName} />
        ))}
      </div>
    </>
  );
}
