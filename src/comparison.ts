import ComparisonEventEmitter from './Events/ComparisonEventEmitter'
import ComparisonEvent from './Events/ComparisonEvent'
import { has } from 'lodash';

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
   * 
   * @see ComparisonEvent
   * @emits sameKeySameValue
   * @emits sameKeyDifferentValue
   * @emits keyMissing
   * @emits keyRemoved
   */
  compare(destinationEnvFilePath: string, sourceEnvFilePath: string): void {
    this.eventEmitter.emit('keyMissing', 'test', true);
  }

  /**
   * Compares two objects and emits events based on their presences and equality
   * 
   * @param {object} destinationObject 
   * @param {object} sourceObject
   * 
   * @see ComparisonEvent
   * @emits sameKeySameValue
   * @emits sameKeyDifferentValue
   * @emits keyMissing
   * @emits keyRemoved
   */
  public compareObjects(destinationObject: object, sourceObject: object): void {
    let missingKeys = Object.assign({}, sourceObject);

    Object.keys(destinationObject).forEach((destKey) => {
      delete missingKeys[destKey];

      // The key has been remove from the source env
      if (!has(sourceObject, destKey)) {
        this.eventEmitter.emit('keyRemoved', destKey, destinationObject[destKey]);
        return;
      }
      
      const destinationValue = destinationObject[destKey];
      const sourceValue = sourceObject[destKey];

      if (destinationValue !== sourceValue) {
        this.eventEmitter.emit('sameKeyDifferentValue', destKey, destinationValue, sourceValue);
        return;
      }

      this.eventEmitter.emit('sameKeySameValue', destKey, destinationValue);
    });

    Object.keys(missingKeys).forEach((srcKey) => {
      this.eventEmitter.emit('keyMissing', srcKey, missingKeys[srcKey]);
    })
  }
}

export default ComparisonEngine