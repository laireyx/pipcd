import { BuffName, Buffs } from '@commonTypes/buffs';
import useTick from '@hooks/useTick';
import useCooldownStore from '@stores/cooldown';
import {
  cooldownActive,
  cooldownImminent,
  cooldownText,
  indicator,
  skillIcon,
} from './index.css';

interface CooldownIndicatorProps {
  buffName: BuffName;
}

export default function CooldownIndicator({
  buffName: name,
}: CooldownIndicatorProps) {
  const { nextReady } = useCooldownStore();

  const cooldownMs = nextReady(name);

  const textClassName = [
    cooldownText,
    cooldownMs === 0 && cooldownActive,
    0 < cooldownMs && cooldownMs < 5000 && cooldownImminent,
  ]
    .filter(Boolean)
    .join(' ');

  useTick();

  return (
    <div className={indicator}>
      <img className={skillIcon} src={Buffs[name].url} />
      <span className={textClassName}>
        {Math.floor(cooldownMs / 1000)}.{Math.floor(cooldownMs / 100) % 10}s
      </span>
    </div>
  );
}
