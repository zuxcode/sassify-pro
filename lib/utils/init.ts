import welcome from 'cli-welcome';
import unhandled from 'cli-handle-unhandled';
import Config from '../config/meta-detail.js';

/**
 * @class Intit
 * @extends Config
 */
class Init extends Config {
  private clear: boolean;

  constructor(clear: boolean = true) {
    super();
    this.clear = clear;
  }

  public initialize(): void {
    welcome({
      title: this.packageName,
      tagLine: `by ${this.authorName}`,
      description: this.description,
      version: this.version,
      bgColor: '#36BB09',
      color: '#000000',
      bold: true,
      clear: this.clear,
    });

    unhandled();
  }
}

export default Init;
