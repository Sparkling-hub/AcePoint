import showFavoritesReducer, {
  setShowFavorites,
} from '../../store/slices/showFavoritesSlice';

describe('showFavorites reducer', () => {
  it('should return the initial state', () => {
    expect(showFavoritesReducer(undefined, {})).toEqual({
      showFavorites: false,
    });
  });

  it('should handle setShowFavorites', () => {
    const initialState = {
      showFavorites: false,
    };
    const action = {
      type: 'showFavorites/setShowFavorites',
      payload: true,
    };
    const newState = {
      showFavorites: true,
    };
    expect(showFavoritesReducer(initialState, action)).toEqual(newState);
  });
});

describe('showFavorites actions', () => {
  it('should create an action to set showFavorites', () => {
    const payload = true;
    const expectedAction = {
      type: 'showFavorites/setShowFavorites',
      payload,
    };
    expect(setShowFavorites(payload)).toEqual(expectedAction);
  });
});
