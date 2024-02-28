import { BuffName, Buffs } from '@commonTypes/buffs';
import validBuffNames from '@utils/mode/validBuffNames';

class BuffImages {
  private buffImages: Record<BuffName, HTMLImageElement>;

  constructor() {
    this.buffImages = {} as Record<BuffName, HTMLImageElement>;

    validBuffNames().forEach((buffName) => {
      this.buffImages[buffName] = new Image();
      this.buffImages[buffName].src = Buffs[buffName].url;
    });
  }

  getImage(buffName: BuffName) {
    return this.buffImages[buffName];
  }
}

const buffImages = new BuffImages();
export default buffImages;
