import ComparisonEngine from '../../src/comparison';
import { parse } from 'dotenv'

const mockEmit = jest.fn();
jest.mock('../../src/Events/ComparisonEventEmitter', () => {
  return {
    default: jest.fn().mockImplementation(() => {
      return {
        emit: mockEmit
      };
    })
  }
})

jest.mock('dotenv', () => {
  return {
    parse: jest.fn()
  }
})

let comparisonEngine: ComparisonEngine

beforeEach(() => {
  comparisonEngine = new ComparisonEngine()
  mockEmit.mockClear()
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('compare', () => {
  test('given two file paths - method should attempt to parse these', () => {
    const destinationEnvFilePath = 'destination.env'
    const sourceEnvFilePath = 'source.env'

    comparisonEngine.compare(destinationEnvFilePath, sourceEnvFilePath)

    expect(parse).toBeCalledTimes(2)
    expect(parse).toBeCalledWith(destinationEnvFilePath)
    expect(parse).toBeCalledWith(sourceEnvFilePath)
    expect(mockEmit).toBeCalledTimes(0)
  })

})

describe('compareObject', () => {
  test('no keys in object should not emit any events', () => {
    const destObj = {}
    const sourceObj = {}

    comparisonEngine.compareObjects(destObj, sourceObj)

    expect(mockEmit).toBeCalledTimes(0)
  })

  test('equal keys, equals values should emit the sameKeySameValue event', () => {
    const key = 'Key'
    const value = 'Value'
    const destObj = { [key]: value }
    const sourceObj = { [key]: value }

    comparisonEngine.compareObjects(destObj, sourceObj)

    expect(mockEmit).toBeCalledTimes(1)
    expect(mockEmit).toBeCalledWith('sameKeySameValue', key, value)
  })

  test('equal keys, different values should emit the sameKeyDifferentValue event', () => {
    const key = 'Key'
    const destObj = { [key]: 'DestinationValue' }
    const sourceObj = { [key]: 'SourceValue' }

    comparisonEngine.compareObjects(destObj, sourceObj);

    expect(mockEmit).toBeCalledTimes(1)
    expect(mockEmit).toBeCalledWith('sameKeyDifferentValue', key, destObj[key], sourceObj[key])
  })

  test('key in destination but not in source should emit a keyRemoved event', () => {
    const key = 'DestinationKey'
    const destObj = { [key]: 'DestinationValue' }
    const sourceObj = {}

    comparisonEngine.compareObjects(destObj, sourceObj);

    expect(mockEmit).toBeCalledTimes(1)
    expect(mockEmit).toBeCalledWith('keyRemoved', key, destObj[key])
  })

  test('key in source but not in destination should emit a keyMissing event', () => {
    const key = 'SourceKey'
    const destObj = {}
    const sourceObj = { [key]: 'SourceValue' }

    comparisonEngine.compareObjects(destObj, sourceObj);

    expect(mockEmit).toBeCalledTimes(1)
    expect(mockEmit).toBeCalledWith('keyMissing', key, sourceObj[key])
  })

  test('multiple keys in object should emit the correct events', () => {
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

    comparisonEngine.compareObjects(destObj, sourceObj);

    expect(mockEmit).toBeCalledTimes(4);
    expect(mockEmit).toBeCalledWith('sameKeySameValue', 'SAME_KEY_SAME_VALUE', 'same')
    expect(mockEmit).toBeCalledWith('sameKeyDifferentValue', 'SAME_KEY_DIFFERENT_VALUE', 'dest', 'source')
    expect(mockEmit).toBeCalledWith('keyMissing', 'KEY_MISSING', 'missing_key')
    expect(mockEmit).toBeCalledWith('keyRemoved', 'KEY_REMOVED', 'removed_key')
  })
})