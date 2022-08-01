export const mockEmit = jest.fn();
const mock = jest.fn().mockImplementation(() => {
  return {
    emit: mockEmit
  };
});

export default mock;