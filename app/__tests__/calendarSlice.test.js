import calendarReducer, { setCalendarOption } from '../../store/slices/calendarSlice';

describe('calendarSlice reducer', () => {
  const initialState = {
    option: 'D',
  };

  it('should handle setCalendarOption', () => {
    const action = setCalendarOption('W');
    const prevState = { ...initialState };

    const newState = calendarReducer(prevState, action);

    expect(newState.option).toEqual('W');
  });

  it('should return the same state for unknown action types', () => {
    const action = { type: 'UNKNOWN_ACTION_TYPE' };
    const prevState = { ...initialState };

    const newState = calendarReducer(prevState, action);

    expect(newState).toEqual(prevState);
  });
});
