import validBuffNames from '@utils/mode/validBuffNames';
import buffImages from './buffImages';
import useCooldownStore from '@stores/cooldown';

class PipCanvas {
  // Indicator dimensions
  static readonly ICON_SIZE = 32;
  static readonly TEXT_WIDTH = 48;
  static readonly INDICATOR_INNER_GAP = 8;
  static readonly INDICATOR_WIDTH =
    this.ICON_SIZE + this.INDICATOR_INNER_GAP + this.TEXT_WIDTH;
  static readonly INDICATOR_HEIGHT = this.ICON_SIZE;

  static readonly INDICATOR_OUTER_GAP = 8;
  static readonly INDICATOR_COLS = 3;
  static readonly INDICATOR_ROWS = 2;

  static readonly PIP_PADDING = 16;

  static readonly PIP_WIDTH =
    this.PIP_PADDING * 2 +
    this.INDICATOR_COLS * this.INDICATOR_WIDTH +
    (this.INDICATOR_COLS - 1) * this.INDICATOR_OUTER_GAP;

  /** @todo calculate pip_height with valid buff count */
  static readonly PIP_HEIGHT =
    this.PIP_PADDING * 2 +
    this.INDICATOR_ROWS * this.INDICATOR_HEIGHT +
    (this.INDICATOR_ROWS - 1) * this.INDICATOR_OUTER_GAP;

  private canvas: HTMLCanvasElement;
  private backCanvas: OffscreenCanvas;
  private backBuffer: OffscreenCanvasRenderingContext2D;

  private ctx: ImageBitmapRenderingContext;

  private captureStream: MediaStream;

  video = document.createElement('video');

  constructor() {
    this.canvas = document.createElement('canvas');
    this.backCanvas = new OffscreenCanvas(
      PipCanvas.PIP_WIDTH,
      PipCanvas.PIP_HEIGHT,
    );

    const ctx = this.canvas.getContext('bitmaprenderer');
    if (!ctx) throw new Error('Cannot initialize canvas context');
    this.ctx = ctx;

    const backBuffer = this.backCanvas.getContext('2d');
    if (!backBuffer) throw new Error('Cannot initialize canvas context');
    this.backBuffer = backBuffer;
    this.initBackBuffer();

    this.captureStream = this.canvas.captureStream();
    this.video.srcObject = this.captureStream;
  }

  // prepares double buffering
  private initBackBuffer() {
    // Cooldown indicator text style
    this.backBuffer.font = '16px bold';
    this.backBuffer.textAlign = 'start';
    this.backBuffer.textBaseline = 'middle';
  }

  resize(width: number, height: number) {
    if (this.canvas.width === width && this.canvas.height === height) return;

    this.canvas.width = this.video.width = width;
    this.canvas.height = this.video.height = height;
  }

  // Use double buffering
  update() {
    // Fill background color
    this.backBuffer.fillStyle = '#242424';
    this.backBuffer.fillRect(0, 0, PipCanvas.PIP_WIDTH, PipCanvas.PIP_HEIGHT);

    validBuffNames().forEach((buffName, index) => {
      const rowIdx = Math.floor(index / PipCanvas.INDICATOR_COLS);
      const colIdx = index % PipCanvas.INDICATOR_COLS;

      const x =
        PipCanvas.PIP_PADDING +
        colIdx * PipCanvas.INDICATOR_WIDTH +
        colIdx * PipCanvas.INDICATOR_OUTER_GAP;

      const y =
        PipCanvas.PIP_PADDING +
        rowIdx * PipCanvas.INDICATOR_HEIGHT +
        rowIdx * PipCanvas.INDICATOR_OUTER_GAP;

      // Draw buff icon
      this.backBuffer.drawImage(buffImages.getImage(buffName), x, y);

      // Draw cooldown text
      const cooldownMs = useCooldownStore.getState().nextReady(buffName);

      // Set text color
      this.backBuffer.fillStyle = 'rgba(255, 255, 255, 0.87)';
      if (cooldownMs === 0)
        this.backBuffer.fillStyle = 'rgba(0, 204, 136, 0.87)';
      else if (cooldownMs < 5000)
        this.backBuffer.fillStyle = 'rgba(204, 0, 0, 0.87)';

      this.backBuffer.fillText(
        `${Math.floor(cooldownMs / 1000)}.${Math.floor(cooldownMs / 100) % 10}s`,
        x + PipCanvas.ICON_SIZE + PipCanvas.INDICATOR_INNER_GAP,
        y + PipCanvas.INDICATOR_HEIGHT / 2,
        PipCanvas.TEXT_WIDTH,
      );
    });
    this.ctx.transferFromImageBitmap(this.backCanvas.transferToImageBitmap());
  }

  async togglePip() {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    } else {
      await this.video.play();
      await this.video.requestPictureInPicture();
    }
  }
}

const pipCanvas = new PipCanvas();
export default pipCanvas;
