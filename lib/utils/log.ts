import boxen from 'boxen';

class DebugLogger {
  constructor() {
    boxen('No Message', { padding: 1, borderStyle: 'double' });
  }

  static log(info: string) {
    console.log(info);
    console.log();
  }
}
export default DebugLogger;
