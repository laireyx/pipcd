import { BuffName, Buffs } from '@commonTypes/buffs';
import runtimeParams from '@utils/runtimeParams';

export default function validBuffNames() {
  return (Object.keys(Buffs) as BuffName[]).filter(
    (buffName) => Buffs[buffName].boss || !runtimeParams.BOSS,
  );
}
