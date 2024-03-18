import showMapsReducer, { setShowMaps } from '../../store/slices/showMapsSlice';

describe('showMaps reducer', () => {
  it('should return the initial state', () => {
    expect(showMapsReducer(undefined, {})).toEqual({
      showMaps: false,
    });
  });

  it('should handle setShowMaps', () => {
    const initialState = {
      showMaps: false,
    };
    const action = {
      type: 'showMaps/setShowMaps',
      payload: true,
    };
    const newState = {
      showMaps: true,
    };
    expect(showMapsReducer(initialState, action)).toEqual(newState);
  });
});

describe('showMaps actions', () => {
  it('should create an action to set showMaps', () => {
    const payload = true;
    const expectedAction = {
      type: 'showMaps/setShowMaps',
      payload,
    };
    expect(setShowMaps(payload)).toEqual(expectedAction);
  });
});
