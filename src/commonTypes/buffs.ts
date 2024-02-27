import continuous from '../assets/icons/continuous.png';
import fatalStrike from '../assets/icons/fatal-strike.png';
import blink from '../assets/icons/blink.png';

import erdaShower from '../assets/icons/erda-shower.png';
import solJanus from '../assets/icons/sol-janus.png';

interface Buff {
  url: string;
  cooldown: number;
  detectAll: boolean;
  cdr: boolean;
}

const Buffs = {
  continuous: {
    url: continuous,
    cooldown: 12,
    detectAll: true,
    cdr: false,
  },
  fatalStrike: {
    url: fatalStrike,
    cooldown: 30,
    detectAll: false,
    cdr: false,
  },
  blink: {
    url: blink,
    cooldown: 20,
    detectAll: false,
    cdr: true,
  },
  erdaShower: {
    url: erdaShower,
    cooldown: 60,
    detectAll: false,
    cdr: true,
  },
  solJanus: {
    url: solJanus,
    cooldown: 60,
    detectAll: false,
    cdr: true,
  },
} as const satisfies Record<string, Buff>;

type BuffName = keyof typeof Buffs;

export type { Buff, BuffName };
export { Buffs };
