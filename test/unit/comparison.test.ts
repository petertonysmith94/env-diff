import ComparisonEngine from '../../src/comparison';
import ComparisonEventEmitter from '../../src/Events/ComparisonEventEmitter'

// jest.mock('../../src/Events/ComparisonEventEmitter')

// const emitMock = jest
//   .spyOn(ComparisonEventEmitter.prototype, 'emit')
//   .mockImplementation()

export const mockEmit = jest.fn();
jest.mock('../../src/Events/ComparisonEventEmitter', () => {
  return {
    default: jest.fn().mockImplementation(() => {
      return {
        emit: mockEmit
      };
    })
  }
})

let comparisonEngine: ComparisonEngine;

beforeEach(() => {

  comparisonEngine = new ComparisonEngine();

})

describe('Compare', () => {
  test('keyMissing event gets emitted', () => {
    comparisonEngine.compare('test', 'test')

    expect(mockEmit).toHaveBeenCalledWith('keyMissing', 'test', true)
  })
})