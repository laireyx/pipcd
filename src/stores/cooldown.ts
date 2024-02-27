import { Buffs, BuffName } from '@commonTypes/buffs';
import { create } from 'zustand';

interface Cdr {
  percentCdr: number;
  fixedCdr: number;
}

interface CooldownStore extends Cdr {
  activationLog: Record<BuffName, number>;

  setPercentCdr: (percentCdr: number) => void;
  setFixedCdr: (fixedCdr: number) => void;

  activate: (buffName: BuffName) => void;
  nextReady: (buffName: BuffName) => number;
}

const useCooldownStore = create<CooldownStore>((set, get) => ({
  percentCdr: 0,
  fixedCdr: 0,

  activationLog: {
    continuous: 0,
    fatalStrike: 0,
    blink: 0,
    erdaShower: 0,
    solJanus: 0,
  },

  setPercentCdr: (percentCdr) => set({ percentCdr }),
  setFixedCdr: (fixedCdr) => set({ fixedCdr }),

  activate: (buffName) =>
    set(({ activationLog }) => ({
      activationLog: {
        ...activationLog,
        [buffName]:
          // If the time gap is
          Date.now() - activationLog[buffName] <
          // less than (cooldown - 3) seconds(continuous ring requires safezone of 4s; 8s/12s),
          (Buffs[buffName].cooldown - 3) * 1000
            ? // Keep using old activation log(It's keep activating)
              activationLog[buffName]
            : // Or update it(It's newly activated)
              Date.now(),
      },
    })),

  /** @see https://www.inven.co.kr/board/maple/2304/32859 */
  nextReady: (buffName) => {
    const { activationLog, percentCdr, fixedCdr } = get();
    const { cooldown, cdr } = Buffs[buffName];

    // Like continuous or fatal-strike
    if (!cdr) {
      return Math.max(
        activationLog[buffName] + cooldown * 1000 - Date.now(),
        0,
      );
    }

    let effectiveCooldown = cooldown * (1 - percentCdr / 100);
    let remainFixedCdr = fixedCdr;

    if (effectiveCooldown > 10) {
      const cdrAmount = Math.min(effectiveCooldown - 10, remainFixedCdr);

      remainFixedCdr -= cdrAmount;
      effectiveCooldown -= cdrAmount;
    }

    effectiveCooldown *= 1 - remainFixedCdr * 0.05;

    return Math.max(
      activationLog[buffName] + effectiveCooldown * 1000 - Date.now(),
      0,
    );
  },
}));

export default useCooldownStore;
