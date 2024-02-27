import Button from '@components/Button';
import CdrInput from '@components/CdrInput';
import { useDetector } from '@utils/detect/BuffDetectorProvider';
import pipElements from '@utils/pipElements';
import { useCallback } from 'react';
import { buttonPanel, controller, title } from './index.css';
import useCooldownStore from '@stores/cooldown';

export default function Controller() {
  const startDetect = useDetector();
  const togglePip = useCallback(() => void pipElements.togglePip(), []);

  const { percentCdr, fixedCdr, setPercentCdr, setFixedCdr } =
    useCooldownStore();

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
