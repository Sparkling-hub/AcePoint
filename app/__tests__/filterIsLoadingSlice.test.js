import filterIsLoadingReducer, {
  setFilterIsLoading,
} from '../../store/slices/filterIsLoadingSlice';

describe('filterIsLoading reducer', () => {
  it('should return the initial state', () => {
    expect(filterIsLoadingReducer(undefined, {})).toEqual({
      filterIsLoading: false,
    });
  });

  it('should handle setFilterIsLoading', () => {
    const initialState = {
      filterIsLoading: false,
    };
    const action = {
      type: 'filterIsLoading/setFilterIsLoading',
      payload: true,
    };
    const newState = {
      filterIsLoading: true,
    };
    expect(filterIsLoadingReducer(initialState, action)).toEqual(newState);
  });
});

describe('filterIsLoading actions', () => {
  it('should create an action to set filterIsLoading', () => {
    const payload = true;
    const expectedAction = {
      type: 'filterIsLoading/setFilterIsLoading',
      payload,
    };
    expect(setFilterIsLoading(payload)).toEqual(expectedAction);
  });
});
