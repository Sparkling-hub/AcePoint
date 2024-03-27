import { addDurationToStartDate, time, date } from '@/services/dateService';
import { expect, describe, it } from '@jest/globals';
import { getUpdatedLessonsForWeeklyView } from '@/services/lessons';

describe('date', () => {
    it('should return the correct date', () => {
        const time = 1630000000;
        const expected = '2021-08-26';
        const result = date(time);
        expect(result).toBe(expected);
    });
});


describe('time', () => {
    it('converts UNIX timestamp to human-readable time', () => {
        // Use any timestamp for testing
        const timestamp = 1625065200; // This is just an example
        const result = time(timestamp);

        // Verify the result matches the expected format "HH:MM"
        expect(result).toMatch(/^\d{2}:\d{2}$/);

        // Further checks to ensure hours and minutes are within expected ranges
        const [hours, minutes] = result.split(':').map(Number);
        expect(hours).toBeGreaterThanOrEqual(0);
        expect(hours).toBeLessThan(24);
        expect(minutes).toBeGreaterThanOrEqual(0);
        expect(minutes).toBeLessThan(60);
    });
});

describe('addDurationToStartDate', () => {
    it('adds duration to start time correctly without needing to adjust hours', () => {
        const startTime = '10:30';
        const duration = '1:15';
        const result = addDurationToStartDate(startTime, duration);
        expect(result).toBe('11:45');
    });

    it('adjusts hours correctly when minutes exceed 60', () => {
        const startTime = '10:45';
        const duration = '0:30';
        const result = addDurationToStartDate(startTime, duration);
        expect(result).toBe('11:00');
    });

    it('handles carrying over to the next hour from minutes correctly', () => {
        const startTime = '10:30';
        const duration = '2:45';
        const result = addDurationToStartDate(startTime, duration);
        // This also tests the '00' padding for minutes
        expect(result).toBe('13:00');
    });
});


describe('getUpdatedLessonsForWeeklyView', () => {
    it('should handle daily lessons', () => {
        const lessons = [
            {
                id: 'lesson1',
                startDate: { seconds: 1630000000 },
                endDate: { seconds: 1630172801 },
                recurrence: 'Daily',
            },
        ];

        const updatedLessons = getUpdatedLessonsForWeeklyView(lessons);

        // Verify that the start date is updated for each day
        expect(updatedLessons).toEqual([
            { id: 'lesson1', startDate: { seconds: 1630000000 }, endDate: { seconds: 1630172801 }, recurrence: 'Daily' }, // 2021-08-26
            { id: 'lesson1', startDate: { seconds: 1630086400 }, endDate: { seconds: 1630172801 }, recurrence: 'Daily' }, // 2021-08-27
            { id: 'lesson1', startDate: { seconds: 1630172800 }, endDate: { seconds: 1630172801 }, recurrence: 'Daily' }, // 2021-08-28
        ]);
    });
    it('should handle every weekday lessons', () => {
        const lessons = [
            {
                id: 'lesson1',
                startDate: { seconds: 1726790500 },
                endDate: { seconds: 1728604900 },
                recurrence: 'EveryWeekDay',
            },
        ];

        const updatedLessons = getUpdatedLessonsForWeeklyView(lessons);

        // Verify that the start date is updated for each weekday
        expect(updatedLessons).toEqual([
            {
                id: 'lesson1',
                startDate: { seconds: 1726790500 },
                endDate: { seconds: 1728604900 },
                recurrence: 'EveryWeekDay'
            },
            {
                id: 'lesson1',
                startDate: { seconds: 1727049700 },
                endDate: { seconds: 1728604900 },
                recurrence: 'EveryWeekDay'
            },
            {
                id: 'lesson1',
                startDate: { seconds: 1727136100 },
                endDate: { seconds: 1728604900 },
                recurrence: 'EveryWeekDay'
            },
            {
                id: 'lesson1',
                startDate: { seconds: 1727222500 },
                endDate: { seconds: 1728604900 },
                recurrence: 'EveryWeekDay'
            },
            {
                id: 'lesson1',
                startDate: { seconds: 1727308900 },
                endDate: { seconds: 1728604900 },
                recurrence: 'EveryWeekDay'
            },
            {
                id: 'lesson1',
                startDate: { seconds: 1727395300 },
                endDate: { seconds: 1728604900 },
                recurrence: 'EveryWeekDay'
            },
            {
                id: 'lesson1',
                startDate: { seconds: 1727654500 },
                endDate: { seconds: 1728604900 },
                recurrence: 'EveryWeekDay'
            },
            {
                id: 'lesson1',
                startDate: { seconds: 1727740900 },
                endDate: { seconds: 1728604900 },
                recurrence: 'EveryWeekDay'
            },
            {
                id: 'lesson1',
                startDate: { seconds: 1727827300 },
                endDate: { seconds: 1728604900 },
                recurrence: 'EveryWeekDay'
            },
            {
                id: 'lesson1',
                startDate: { seconds: 1727913700 },
                endDate: { seconds: 1728604900 },
                recurrence: 'EveryWeekDay'
            },
            {
                id: 'lesson1',
                startDate: { seconds: 1728000100 },
                endDate: { seconds: 1728604900 },
                recurrence: 'EveryWeekDay'
            },
            {
                id: 'lesson1',
                startDate: { seconds: 1728259300 },
                endDate: { seconds: 1728604900 },
                recurrence: 'EveryWeekDay'
            },
            {
                id: 'lesson1',
                startDate: { seconds: 1728345700 },
                endDate: { seconds: 1728604900 },
                recurrence: 'EveryWeekDay'
            },
            {
                id: 'lesson1',
                startDate: { seconds: 1728432100 },
                endDate: { seconds: 1728604900 },
                recurrence: 'EveryWeekDay'
            },
            {
                id: 'lesson1',
                startDate: { seconds: 1728518500 },
                endDate: { seconds: 1728604900 },
                recurrence: 'EveryWeekDay'
            },
            {
                id: 'lesson1',
                startDate: { seconds: 1728604900 },
                endDate: { seconds: 1728604900 },
                recurrence: 'EveryWeekDay'
            },
        ]);
    });
    it('should handle weekly lessons', () => {
        const lessons = [
            {
                id: 'lesson1',
                startDate: { seconds: 1630000000 },
                endDate: { seconds: 1631283201 },
                recurrence: 'Weekly',
            },
        ];

        const updatedLessons = getUpdatedLessonsForWeeklyView(lessons);

        // Verify that the start date is updated for each week
        expect(updatedLessons).toEqual([
            { id: 'lesson1', startDate: { seconds: 1630000000 }, endDate: { seconds: 1631283201 }, recurrence: 'Weekly' }, // 2021-08-26
            { id: 'lesson1', startDate: { seconds: 1630604800 }, endDate: { seconds: 1631283201 }, recurrence: 'Weekly' }, // 2021-09-02
            { id: 'lesson1', startDate: { seconds: 1631209600 }, endDate: { seconds: 1631283201 }, recurrence: 'Weekly' }, // 2021-09-09
        ]);
    });
    it('should handle lessons with no recurrence', () => {
        const lessons = [
            {
                id: 'lesson1',
                startDate: { seconds: 1630000000 },
                endDate: { seconds: 1630000001 },
                recurrence: 'None',
            },
        ];

        const updatedLessons = getUpdatedLessonsForWeeklyView(lessons);
        expect(updatedLessons).toEqual([
            { id: 'lesson1', startDate: { seconds: 1630000000 }, endDate: { seconds: 1630000001 }, recurrence: 'None' }, // 2021-08-26
        ]);
    });
});