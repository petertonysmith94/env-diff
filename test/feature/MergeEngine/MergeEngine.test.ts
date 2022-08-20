import MergeEngine from '../../../src/Merge/MergeEngine';

let mergeEngine: MergeEngine

beforeEach(() => {
  mergeEngine = new MergeEngine()
})

describe('merge', () => {
  test('given two objects, merge should create a new object', () => {
    const destObj = {
      SAME_KEY_SAME_VALUE: 'same',
      SAME_KEY_DIFFERENT_VALUE: 'dest',
      KEY_REMOVED: 'removed_key'
    }
    const sourceObj = {
      SAME_KEY_SAME_VALUE: 'same',
      SAME_KEY_DIFFERENT_VALUE: 'source',
      KEY_MISSING: 'missing_key'
    }

    const actualObj = mergeEngine.merge(destObj, sourceObj)

    expect(actualObj).toEqual({
      SAME_KEY_SAME_VALUE: 'same',
      SAME_KEY_DIFFERENT_VALUE: 'source',
      KEY_MISSING: 'missing_key'
    })
  })
})