import Button from '@components/Button';
import CdrInput from '@components/CdrInput';
import { useDetector } from '@utils/detect/BuffDetectorProvider';
import pipCanvas from '@utils/pipCanvas';
import { useCallback } from 'react';
import { buttonPanel, controller, title } from './index.css';
import useCooldownStore from '@stores/cooldown';
import usePip from '@hooks/usePip';

export default function Controller() {
  const startDetect = useDetector();
  const togglePip = useCallback(() => void pipCanvas.togglePip(), []);

  const { percentCdr, fixedCdr, setPercentCdr, setFixedCdr } =
    useCooldownStore();

  usePip();

  return (
    <div className={controller}>
      <h1 className={title}>pipcd</h1>
      <div>
        <CdrInput
          id="percent"
          label="쿨타임 감소(%)"
          value={percentCdr}
          onChange={setPercentCdr}
        />
        <CdrInput
          id="fixed"
          label="쿨타임 감소(초)"
          value={fixedCdr}
          onChange={setFixedCdr}
        />
      </div>
      <div className={buttonPanel}>
        <Button onClick={() => void startDetect()}>startDetect</Button>
        <Button onClick={togglePip}>togglePip</Button>
      </div>
    </div>
  );
}
