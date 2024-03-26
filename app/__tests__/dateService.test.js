import { addDurationToStartDate, time, date } from '@/services/dateService';
import { expect, describe, it } from '@jest/globals';

// describe('addDurationToStartDate', () => {
//     it('should add duration to start date', () => {
//         const startDate = '10:30';
//         const duration = '01:15';
//         const expected = '11:45';
//         const result = addDurationToStartDate(startDate, duration);
//         expect(result).toBe(expected);
//     });

// });
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