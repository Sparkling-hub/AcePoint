import { addDurationToStartDate, time, date } from '@/services/dateService';
import { expect, describe, it } from '@jest/globals';

describe('addDurationToStartDate', () => {
    it('should add duration to start date', () => {
        const startDate = '10:30';
        const duration = '01:15';
        const expected = '11:45';
        const result = addDurationToStartDate(startDate, duration);
        expect(result).toBe(expected);
    });

});
describe('date', () => {
    it('should return the correct date', () => {
        const time = 1630000000;
        const expected = '2021-08-26';
        const result = date(time);
        expect(result).toBe(expected);
    });
});

describe('time', () => {
    it('should return the correct time', () => {
        const timeS = 1630000000;
        const expected = "19:46";
        const result = time(timeS);
        expect(result).toBe(expected);
    });
});