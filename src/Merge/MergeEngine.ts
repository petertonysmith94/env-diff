import * as dotenv from 'dotenv'
import ComparisonEngine from '../Comparison/ComparisonEngine';
import { Key, Value } from "../Events/ComparisonEvent";
import ComparisonEventEmitter from "../Events/ComparisonEventEmitter";
import MergeOptions from "./MergeOptions";


class MergeEngine {
  /**
   * @var {MergeOptions}
   */
  private static DEFAULT_OPTIONS: MergeOptions = {
    sortOptions: 'alphabetical'
  }

  /**
   * @var {ComparisonEventEmitter}
   */
  private eventEmitter: ComparisonEventEmitter;

  /**
   * @var {ComparisonEngine}
   */
  private comparsionEngine: ComparisonEngine;

  /**
   * @var {object | null}
   */
  private finalObject: object | null;

  public constructor () {
    this.eventEmitter = new ComparisonEventEmitter();
    this.comparsionEngine = new ComparisonEngine(this.eventEmitter);
  }

  public merge(destinationObject: object, sourceObject: object, options?: MergeOptions): object {
    this.finalObject = {};
    
    this.registerEventListeners();
    this.comparsionEngine.compareObjects(destinationObject, sourceObject)

    return Object.assign({}, this.finalObject);
  }

  private registerEventListeners() {
    this.eventEmitter.on('sameKeySameValue', this.sameKeySameValue)
    this.eventEmitter.on('sameKeyDifferentValue', this.sameKeyDifferentValue)
    this.eventEmitter.on('keyMissing', this.keyMissing)
    this.eventEmitter.on('keyRemoved', this.keyRemoved);
  }

  private sameKeySameValue = (key: Key, value: Value) => {
    // console.log('sameKeySameValue => add key and value', { key, value })
    this.finalObject[key] = value
  }

  private sameKeyDifferentValue = (key: Key, destinationValue: Value, sourceValue: Value) => {
    // console.log('sameKeyDifferentValue => update value/do nothing', { key, destinationValue, sourceValue })
    this.finalObject[key] = sourceValue
  }

  private keyMissing = (key: Key, sourceValue: Value) => {
    // console.log('keyMissing => add key and value', { key, sourceValue })
    this.finalObject[key] = sourceValue
  }

  private keyRemoved = (key: Key, destinationValue: Value) => {
    // console.log('keyRemoved => remove/do nothing/comment out', { key, destinationValue })
  }
}

export default MergeEngine;