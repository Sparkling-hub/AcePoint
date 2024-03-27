import calendarReducer, { setCalendarOption } from '../../store/slices/calendarSlice';
import coachReducer, { setCoachName, setCoachId, setLessons } from '../../store/slices/CoachSlice';

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

describe('coachSlice reducer', () => {
  const initialState = {
    id: '',
    displayName: '',
    lessons: [],
  };

  it('should handle setCoachName', () => {
    const action = setCoachName('John Doe');
    const prevState = { ...initialState };

    const newState = coachReducer(prevState, action);

    expect(newState.displayName).toEqual('John Doe');
  });

  it('should handle setCoachId', () => {
    const action = setCoachId('coach123');
    const prevState = { ...initialState };

    const newState = coachReducer(prevState, action);

    expect(newState.id).toEqual('coach123');
  });

  it('should handle setLessons', () => {
    const action = setLessons(['lesson1', 'lesson2']);
    const prevState = { ...initialState };

    const newState = coachReducer(prevState, action);

    expect(newState.lessons).toEqual(['lesson1', 'lesson2']);
  });

  it('should return the same state for unknown action types', () => {
    const action = { type: 'UNKNOWN_ACTION_TYPE' };
    const prevState = { ...initialState };

    const newState = coachReducer(prevState, action);

    expect(newState).toEqual(prevState);
  });
});
