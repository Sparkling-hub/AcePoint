import coachSearchResultsReducer, {
  setCoachSearchResults,
} from '../../store/slices/coachSearchResultsSlice';

describe('coachSearchResults reducer', () => {
  it('should return the initial state', () => {
    expect(coachSearchResultsReducer(undefined, {})).toEqual({
      coachSearchResults: [],
    });
  });

  it('should handle setCoachSearchResults', () => {
    const initialState = {
      coachSearchResults: [],
    };
    const action = {
      type: 'coachSearchResults/setCoachSearchResults',
      payload: [
        { id: 1, name: 'Coach A' },
        { id: 2, name: 'Coach B' },
      ],
    };
    const newState = {
      coachSearchResults: [
        { id: 1, name: 'Coach A' },
        { id: 2, name: 'Coach B' },
      ],
    };
    expect(coachSearchResultsReducer(initialState, action)).toEqual(newState);
  });
});

describe('coachSearchResults actions', () => {
  it('should create an action to set coachSearchResults', () => {
    const payload = [
      { id: 1, name: 'Coach A' },
      { id: 2, name: 'Coach B' },
    ];
    const expectedAction = {
      type: 'coachSearchResults/setCoachSearchResults',
      payload,
    };
    expect(setCoachSearchResults(payload)).toEqual(expectedAction);
  });
});
