export type Key = string;

export type Value = any;

/**
 * The below code blocks show the different events/scenarios that we've tailed from
 * 
 * .env.destination
 * ```
 * SAME_KEY_SAME_VALUE=same
 * SAME_KEY_DIFFERENT_VALUE=dest
 * 
 * KEY_REMOVED=removed_key
 * ```
 * 
 * .env.source
 * ```
 * SAME_KEY_SAME_VALUE=same
 * SAME_KEY_DIFFERENT_VALUE=source
 * KEY_MISSING=missing_key
 * 
 * ```
 */
type ComparisonEvent = {

  sameKeySameValue: (key: Key, value: Value) => void;

  sameKeyDifferentValue: (key: Key, destinationValue: Value, sourceValue: Value) => void;

  /**
   * An environmental variable key is missing from the destination env file.
   * 
   * @param {Key}   key - the key that is missing from the destination env file.
   * @param {Value} sourceValue - the value of the key from the source env file.
   */
  keyMissing: (key: Key, sourceValue: Value) => void;

  /**
   * 
   */
  keyRemoved: (key: Key, destinationValue: Value) => void;
}

export default ComparisonEvent