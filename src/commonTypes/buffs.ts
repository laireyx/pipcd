import continuous from '../assets/icons/continuous.png';
import fatalStrike from '../assets/icons/fatal-strike.png';
import blink from '../assets/icons/blink.png';

import erdaShower from '../assets/icons/erda-shower.png';
import solJanus from '../assets/icons/sol-janus.png';

interface Buff {
  url: string;
  cooldown: number;
  /** @property true if needs to detect all icons, false otherwise */
  detectAll: boolean;
  /** @property true if cooldown reducible, false otherwise */
  cdr: boolean;
  /** @property true if applied in boss mode, false otherwise. */
  boss: boolean;
}

const Buffs = {
  continuous: {
    url: continuous,
    cooldown: 12,
    detectAll: true,
    cdr: false,
    boss: true,
  },
  fatalStrike: {
    url: fatalStrike,
    cooldown: 30,
    detectAll: false,
    cdr: false,
    boss: true,
  },
  blink: {
    url: blink,
    cooldown: 20,
    detectAll: false,
    cdr: true,
    boss: true,
  },
  erdaShower: {
    url: erdaShower,
    cooldown: 60,
    detectAll: false,
    cdr: true,
    boss: false,
  },
  solJanus: {
    url: solJanus,
    cooldown: 60,
    detectAll: false,
    cdr: true,
    boss: false,
  },
} as const satisfies Record<string, Buff>;

type BuffName = keyof typeof Buffs;

export type { Buff, BuffName };
export { Buffs };
