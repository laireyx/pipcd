import { BuffName } from '@commonTypes/buffs';
import { create } from 'zustand';

interface CooldownStore {
  activate: (buffName: BuffName) => void;
}

const useCooldownStore = create<CooldownStore>(() => ({
  activate: () => {},
}));

export default useCooldownStore;
