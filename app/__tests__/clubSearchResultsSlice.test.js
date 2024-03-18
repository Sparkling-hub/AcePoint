import clubSearchResultsReducer, {
  setClubSearchResults,
} from '../../store/slices/clubSearchResultsSlice';

describe('clubSearchResults reducer', () => {
  it('should return the initial state', () => {
    expect(clubSearchResultsReducer(undefined, {})).toEqual({
      clubSearchResults: [],
    });
  });

  it('should handle setClubSearchResults', () => {
    const initialState = {
      clubSearchResults: [],
    };
    const action = {
      type: 'clubSearchResults/setClubSearchResults',
      payload: [
        { id: 1, name: 'Club A' },
        { id: 2, name: 'Club B' },
      ],
    };
    const newState = {
      clubSearchResults: [
        { id: 1, name: 'Club A' },
        { id: 2, name: 'Club B' },
      ],
    };
    expect(clubSearchResultsReducer(initialState, action)).toEqual(newState);
  });
});

describe('clubSearchResults actions', () => {
  it('should create an action to set clubSearchResults', () => {
    const payload = [
      { id: 1, name: 'Club A' },
      { id: 2, name: 'Club B' },
    ];
    const expectedAction = {
      type: 'clubSearchResults/setClubSearchResults',
      payload,
    };
    expect(setClubSearchResults(payload)).toEqual(expectedAction);
  });
});
