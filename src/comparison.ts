import ComparisonEventEmitter from './Events/ComparisonEventEmitter'


class ComparisonEngine {

  private eventEmitter: ComparisonEventEmitter;

  constructor () {
    this.eventEmitter = new ComparisonEventEmitter();
  }

  /**
   * Load in both the files, convert to object and compare the two for differences
   * 
   * @param {string} destinationEnvFilePath
   * @param {string} sourceEnvFilePath
   */
  compare(destinationEnvFilePath: string, sourceEnvFilePath: string): void {
    this.eventEmitter.emit('keyMissing', 'test', true);
  }

  /**
   * 
   * @param destinationObject 
   * @param sourceObject 
   */
  compareObjects(destinationObject: object, sourceObject: string): void {

  }
}

export default ComparisonEngine