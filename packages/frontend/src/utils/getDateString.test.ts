import { getDateString } from './getDateString';

describe('test getDateString function', () => {
  describe('timezone should be set to Asia/Seoul(UTC+09:00)', () => {
    expect(new Date().getTimezoneOffset()).toBe(-540);
  });

  describe('when given KST(UTC+09:00) date object at 2021-01-14 23:59', () => {
    const dateString = 'Thu Jan 14 2021 23:59:00 GMT+0900 (대한민국 표준시)';
    const date = new Date(dateString);
    it('returns 2021-01-14', () => {
      expect(getDateString(date)).toBe('2021-01-14');
    });
  });

  describe('when given KST(UTC+09:00) date object at 2021-01-15 00:00', () => {
    const dateString = 'Fri Jan 15 2021 00:00:00 GMT+0900 (대한민국 표준시)';
    const date = new Date(dateString);
    it('returns 2021-01-15', () => {
      expect(getDateString(date)).toBe('2021-01-15');
    });
  });
});
