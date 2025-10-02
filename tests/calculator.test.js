const Calculator = require('../src/calculator');

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('add method', () => {
    test('should return 0 for empty string', () => {
      expect(calculator.add('')).toBe(0);
    });

    test('should return 0 for string with only spaces', () => {
      expect(calculator.add('   ')).toBe(0);
    });

    test('should return 0 for null or undefined', () => {
      expect(calculator.add(null)).toBe(0);
      expect(calculator.add(undefined)).toBe(0);
    });

    test('should return the number for single number input', () => {
      expect(calculator.add('1')).toBe(1);
      expect(calculator.add('5')).toBe(5);
      expect(calculator.add('42')).toBe(42);
    });

    test('should return the number for single number with spaces', () => {
      expect(calculator.add(' 1 ')).toBe(1);
      expect(calculator.add('  5  ')).toBe(5);
    });

    test('should return sum for two numbers separated by comma', () => {
      expect(calculator.add('1,2')).toBe(3);
      expect(calculator.add('5,3')).toBe(8);
      expect(calculator.add('10,20')).toBe(30);
    });

    test('should return sum for two numbers with spaces around comma', () => {
      expect(calculator.add('1 , 2')).toBe(3);
      expect(calculator.add(' 5 , 3 ')).toBe(8);
      expect(calculator.add('  10  ,  20  ')).toBe(30);
    });

    test('should return sum for multiple numbers', () => {
      expect(calculator.add('1,2,3')).toBe(6);
      expect(calculator.add('1,2,3,4')).toBe(10);
      expect(calculator.add('1,2,3,4,5')).toBe(15);
      expect(calculator.add('10,20,30,40')).toBe(100);
    });

    test('should return sum for multiple numbers with spaces', () => {
      expect(calculator.add('1 , 2 , 3')).toBe(6);
      expect(calculator.add(' 1 , 2 , 3 , 4 ')).toBe(10);
      expect(calculator.add('  10  ,  20  ,  30  ')).toBe(60);
    });

    test('should handle zero values', () => {
      expect(calculator.add('0')).toBe(0);
      expect(calculator.add('0,0')).toBe(0);
      expect(calculator.add('5,0')).toBe(5);
      expect(calculator.add('0,5')).toBe(5);
      expect(calculator.add('1,0,2')).toBe(3);
      expect(calculator.add('0,0,0')).toBe(0);
    });

    test('should handle negative numbers', () => {
      expect(calculator.add('-1')).toBe(-1);
      expect(calculator.add('-1,2')).toBe(1);
      expect(calculator.add('1,-2')).toBe(-1);
      expect(calculator.add('-5,-3')).toBe(-8);
      expect(calculator.add('1,-2,3')).toBe(2);
      expect(calculator.add('-1,-2,-3')).toBe(-6);
      expect(calculator.add('1,-2,3,-4')).toBe(-2);
    });

    test('should handle invalid number strings gracefully', () => {
      expect(calculator.add('abc')).toBe(0);
      expect(calculator.add('1,abc')).toBe(1);
      expect(calculator.add('abc,2')).toBe(2);
      expect(calculator.add('abc,def')).toBe(0);
      expect(calculator.add('1,abc,3')).toBe(4);
      expect(calculator.add('abc,2,def')).toBe(2);
      expect(calculator.add('1,abc,3,def')).toBe(4);
    });
  });
});
