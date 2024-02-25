import continous from '../assets/icons/continuous.png';
import fatalStrike from '../assets/icons/fatal-strike.png';

import erdaShower from '../assets/icons/erda-shower.png';
import solJanus from '../assets/icons/sol-janus.png';

type BuffImpl = {
  name: string;
  url: string;
  cooldown: number;
  detectAll: boolean;
};

const Buffs = [
  {
    name: 'continuous',
    url: continous,
    cooldown: 12,
    detectAll: true,
  },
  {
    name: 'fatalStrike',
    url: fatalStrike,
    cooldown: 30,
    detectAll: false,
  },
  {
    name: 'erdaShower',
    url: erdaShower,
    cooldown: 60,
    detectAll: false,
  },
  {
    name: 'solJanus',
    url: solJanus,
    cooldown: 60,
    detectAll: false,
  },
] as const satisfies BuffImpl[];

type BuffName = (typeof Buffs)[number]['name'];
interface Buff extends BuffImpl {
  name: BuffName;
}

export type { Buff, BuffName };
export { Buffs };
