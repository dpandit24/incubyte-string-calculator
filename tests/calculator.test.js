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

    test('should handle newlines as delimiters', () => {
      expect(calculator.add('1\n2')).toBe(3);
      expect(calculator.add('1\n2\n3')).toBe(6);
      expect(calculator.add('1\n2,3')).toBe(6);
      expect(calculator.add('1,2\n3')).toBe(6);
      expect(calculator.add('1\n2\n3\n4')).toBe(10);
    });

    test('should handle mixed delimiters (commas and newlines)', () => {
      expect(calculator.add('1,2\n3,4')).toBe(10);
      expect(calculator.add('1\n2,3\n4')).toBe(10);
      expect(calculator.add('1,2,3\n4,5')).toBe(15);
      expect(calculator.add('1\n2\n3,4\n5')).toBe(15);
    });

    test('should handle newlines with spaces', () => {
      expect(calculator.add('1 \n 2')).toBe(3);
      expect(calculator.add(' 1 \n 2 \n 3 ')).toBe(6);
      expect(calculator.add('1 , 2 \n 3 , 4 ')).toBe(10);
    });

    test('should support custom delimiters with //[delimiter]\\n format', () => {
      expect(calculator.add('//;\n1;2')).toBe(3);
      expect(calculator.add('//;\n1;2;3')).toBe(6);
      expect(calculator.add('//|\n1|2|3')).toBe(6);
      expect(calculator.add('//*\n1*2*3')).toBe(6);
      expect(calculator.add('//#\n1#2#3#4')).toBe(10);
    });

    test('should support custom delimiters with single character', () => {
      expect(calculator.add('//@\n1@2')).toBe(3);
      expect(calculator.add('//$\n1$2$3')).toBe(6);
      expect(calculator.add('//%\n1%2%3%4')).toBe(10);
    });

    test('should support custom delimiters with multiple characters', () => {
      expect(calculator.add('//abc\n1abc2')).toBe(3);
      expect(calculator.add('//xyz\n1xyz2xyz3')).toBe(6);
      expect(calculator.add('//delim\n1delim2delim3')).toBe(6);
    });

    test('should support delimiters of any length with bracket format', () => {
      expect(calculator.add('//[***]\n1***2***3')).toBe(6);
      expect(calculator.add('//[abc]\n1abc2abc3')).toBe(6);
      expect(calculator.add('//[xyz]\n1xyz2xyz3')).toBe(6);
      expect(calculator.add('//[delimiter]\n1delimiter2delimiter3')).toBe(6);
      expect(calculator.add('//[***]\n1***2***3***4')).toBe(10);
    });

    test('should support very long delimiters with bracket format', () => {
      expect(calculator.add('//[verylongdelimiter]\n1verylongdelimiter2verylongdelimiter3')).toBe(6);
      expect(calculator.add('//[***]\n1***2***3')).toBe(6);
      expect(calculator.add('//[@@@@]\n1@@@@2@@@@3')).toBe(6);
      expect(calculator.add('//[del]\n1del2del3')).toBe(6);
    });

    test('should support special characters in bracket delimiters', () => {
      expect(calculator.add('//[***]\n1***2***3')).toBe(6);
      expect(calculator.add('//[###]\n1###2###3')).toBe(6);
      expect(calculator.add('//[$$$]\n1$$$2$$$3')).toBe(6);
      expect(calculator.add('//[---]\n1---2---3')).toBe(6);
      expect(calculator.add('//[+++]\n1+++2+++3')).toBe(6);
    });

    test('should handle bracket delimiters with spaces', () => {
      expect(calculator.add('//[***]\n1 *** 2 *** 3')).toBe(6);
      expect(calculator.add('//[abc]\n 1 abc 2 abc 3 ')).toBe(6);
      expect(calculator.add('//[xyz]\n1 xyz 2 xyz 3 xyz 4')).toBe(10);
    });

    test('should handle bracket delimiters with newlines in numbers', () => {
      expect(calculator.add('//[***]\n1***2\n3')).toBe(6);
      expect(calculator.add('//[abc]\n1abc2\n3abc4')).toBe(10);
      expect(calculator.add('//[xyz]\n1xyz2xyz3\n4xyz5')).toBe(15);
    });

    test('should handle bracket delimiters with zero and negative numbers', () => {
      expect(calculator.add('//[***]\n0***0')).toBe(0);
      expect(calculator.add('//[abc]\n1abc0abc2')).toBe(3);
      expect(() => calculator.add('//[***]\n-1***2')).toThrow('negatives not allowed - -1');
      expect(() => calculator.add('//[abc]\n1abc-2abc3')).toThrow('negatives not allowed - -2');
      expect(() => calculator.add('//[xyz]\n-1xyz-2xyz-3')).toThrow('negatives not allowed - -1, -2, -3');
    });

    test('should handle bracket delimiters with numbers > 1000', () => {
      expect(calculator.add('//[***]\n2***1001')).toBe(2);
      expect(calculator.add('//[abc]\n1abc1001abc3')).toBe(4);
      expect(calculator.add('//[xyz]\n1001xyz1002xyz1003')).toBe(0);
      expect(calculator.add('//[***]\n1000***1001')).toBe(1000);
    });

    test('should handle bracket delimiters with invalid numbers', () => {
      expect(calculator.add('//[***]\n1***abc***3')).toBe(4);
      expect(calculator.add('//[abc]\nabcabc2abcdef')).toBe(2);
      expect(calculator.add('//[xyz]\n1xyzabcxyz3xyzdef')).toBe(4);
    });

    test('should support multiple delimiters with bracket format', () => {
      expect(calculator.add('//[*][%]\n1*2%3')).toBe(6);
      expect(calculator.add('//[;][,]\n1;2,3')).toBe(6);
      expect(calculator.add('//[abc][xyz]\n1abc2xyz3')).toBe(6);
      expect(calculator.add('//[***][###]\n1***2###3')).toBe(6);
      expect(calculator.add('//[*][%][#]\n1*2%3#4')).toBe(10);
    });

    test('should support multiple delimiters with different lengths', () => {
      expect(calculator.add('//[*][abc]\n1*2abc3')).toBe(6);
      expect(calculator.add('//[abc][*]\n1abc2*3')).toBe(6);
      expect(calculator.add('//[***][xyz]\n1***2xyz3')).toBe(6);
      expect(calculator.add('//[xyz][***]\n1xyz2***3')).toBe(6);
      expect(calculator.add('//[a][bc][def]\n1a2bc3def4')).toBe(10);
    });

    test('should handle multiple delimiters with spaces', () => {
      expect(calculator.add('//[*][%]\n1 * 2 % 3')).toBe(6);
      expect(calculator.add('//[;][,]\n 1 ; 2 , 3 ')).toBe(6);
      expect(calculator.add('//[abc][xyz]\n1 abc 2 xyz 3')).toBe(6);
    });

    test('should handle multiple delimiters with newlines in numbers', () => {
      expect(calculator.add('//[*][%]\n1*2\n3')).toBe(6);
      expect(calculator.add('//[;][,]\n1;2\n3,4')).toBe(10);
      expect(calculator.add('//[abc][xyz]\n1abc2\n3xyz4')).toBe(10);
    });

    test('should handle multiple delimiters with zero and negative numbers', () => {
      expect(calculator.add('//[*][%]\n0*0%0')).toBe(0);
      expect(calculator.add('//[;][,]\n1;0,2')).toBe(3);
      expect(() => calculator.add('//[*][%]\n-1*2%3')).toThrow('negatives not allowed - -1');
      expect(() => calculator.add('//[;][,]\n1;-2,3')).toThrow('negatives not allowed - -2');
      expect(() => calculator.add('//[abc][xyz]\n-1abc-2xyz-3')).toThrow('negatives not allowed - -1, -2, -3');
    });

    test('should handle multiple delimiters with numbers > 1000', () => {
      expect(calculator.add('//[*][%]\n2*1001%3')).toBe(5);
      expect(calculator.add('//[;][,]\n1;1001,3')).toBe(4);
      expect(calculator.add('//[abc][xyz]\n1001abc1002xyz1003')).toBe(0);
      expect(calculator.add('//[*][%]\n1000*1001%1002')).toBe(1000);
    });

    test('should handle multiple delimiters with invalid numbers', () => {
      expect(calculator.add('//[*][%]\n1*abc%3')).toBe(4);
      expect(calculator.add('//[;][,]\nabc;2,def')).toBe(2);
      expect(calculator.add('//[abc][xyz]\n1abcdefxyz3xyzghi')).toBe(4);
    });

    test('should handle three or more delimiters', () => {
      expect(calculator.add('//[*][%][#]\n1*2%3#4')).toBe(10);
      expect(calculator.add('//[a][b][c][d]\n1a2b3c4d5')).toBe(15);
      expect(calculator.add('//[;][,][|]\n1;2,3|4')).toBe(10);
      expect(calculator.add('//[abc][xyz][del]\n1abc2xyz3del4')).toBe(10);
    });

    test('should handle multiple delimiters with length > 1 character', () => {
      expect(calculator.add('//[abc][def]\n1abc2def3')).toBe(6);
      expect(calculator.add('//[abc][def]\n1abc2def3')).toBe(6);
      expect(calculator.add('//[hello][world]\n1hello2world3')).toBe(6);
      expect(calculator.add('//[test][case]\n1test2case3')).toBe(6);
      expect(calculator.add('//[verylong][delimiter]\n1verylong2delimiter3')).toBe(6);
    });

    test('should handle multiple delimiters with special characters and length > 1', () => {
      expect(calculator.add('//[***][###]\n1***2###3')).toBe(6);
      expect(calculator.add('//[$$$][@@@]\n1$$$2@@@3')).toBe(6);
      expect(calculator.add('//[---][+++]\n1---2+++3')).toBe(6);
      expect(calculator.add('//[!!!][???]\n1!!!2???3')).toBe(6);
      expect(calculator.add('//[***][xyz][###]\n1***2xyz3###4')).toBe(10);
    });

    test('should handle multiple delimiters with mixed lengths', () => {
      expect(calculator.add('//[a][abc][def]\n1a2abc3def4')).toBe(10);
      expect(calculator.add('//[abc][d][efg]\n1abc2d3efg4')).toBe(10);
      expect(calculator.add('//[x][y][z][abc]\n1x2y3z4abc5')).toBe(15);
      expect(calculator.add('//[verylong][a][short]\n1verylong2a3short4')).toBe(10);
    });

    test('should handle multiple delimiters with numbers and special chars', () => {
      expect(calculator.add('//[abc][def]\n1abc2def3')).toBe(6);
      expect(calculator.add('//[abc][xyz][def]\n1abc2xyz3def4')).toBe(10);
      expect(calculator.add('//[test][case][def]\n1test2case3def4')).toBe(10);
      expect(calculator.add('//[***][xyz][###]\n1***2xyz3###4')).toBe(10);
    });

    test('should handle multiple delimiters with spaces and length > 1', () => {
      expect(calculator.add('//[abc][def]\n1 abc 2 def 3')).toBe(6);
      expect(calculator.add('//[abc][def]\n 1 abc 2 def 3 ')).toBe(6);
      expect(calculator.add('//[hello][world]\n1 hello 2 world 3')).toBe(6);
    });

    test('should handle multiple delimiters with newlines and length > 1', () => {
      expect(calculator.add('//[abc][def]\n1abc2\n3')).toBe(6);
      expect(calculator.add('//[abc][def]\n1abc2\n3def4')).toBe(10);
      expect(calculator.add('//[hello][world]\n1hello2\n3world4')).toBe(10);
    });

    test('should handle multiple delimiters with negative numbers and length > 1', () => {
      expect(() => calculator.add('//[abc][def]\n-1abc2def3')).toThrow('negatives not allowed - -1');
      expect(() => calculator.add('//[abc][def]\n1abc-2def3')).toThrow('negatives not allowed - -2');
      expect(() => calculator.add('//[hello][world]\n-1hello-2world-3')).toThrow('negatives not allowed - -1, -2, -3');
    });

    test('should handle multiple delimiters with numbers > 1000 and length > 1', () => {
      expect(calculator.add('//[abc][def]\n2abc1001def3')).toBe(5);
      expect(calculator.add('//[abc][def]\n1abc1001def3')).toBe(4);
      expect(calculator.add('//[hello][world]\n1001hello1002world1003')).toBe(0);
      expect(calculator.add('//[test][case]\n1000test1001case1002')).toBe(1000);
    });

    test('should handle custom delimiters with spaces', () => {
      expect(calculator.add('//;\n1 ; 2')).toBe(3);
      expect(calculator.add('//|\n 1 | 2 | 3 ')).toBe(6);
      expect(calculator.add('//*\n1 * 2 * 3 * 4')).toBe(10);
    });

    test('should handle custom delimiters with newlines in numbers', () => {
      expect(calculator.add('//;\n1;2\n3')).toBe(6);
      expect(calculator.add('//|\n1|2\n3|4')).toBe(10);
      expect(calculator.add('//*\n1*2*3\n4*5')).toBe(15);
    });

    test('should handle custom delimiters with zero values', () => {
      expect(calculator.add('//;\n0;0')).toBe(0);
      expect(calculator.add('//|\n1|0|2')).toBe(3);
    });

    test('should throw exception for negative numbers with custom delimiters', () => {
      expect(() => calculator.add('//*\n-1*2')).toThrow('negatives not allowed - -1');
      expect(() => calculator.add('//#\n1#-2#3')).toThrow('negatives not allowed - -2');
      expect(() => calculator.add('//@\n-1@-2@-3')).toThrow('negatives not allowed - -1, -2, -3');
      expect(() => calculator.add('//;\n-1;-2')).toThrow('negatives not allowed - -1, -2');
      expect(() => calculator.add('//|\n1|-2|3')).toThrow('negatives not allowed - -2');
    });

    test('should handle custom delimiters with invalid numbers', () => {
      expect(calculator.add('//;\n1;abc;3')).toBe(4);
      expect(calculator.add('//|\nabc|2|def')).toBe(2);
      expect(calculator.add('//*\n1*abc*3*def')).toBe(4);
    });

    test('should fallback to default delimiters when custom delimiter format is invalid', () => {
      expect(calculator.add('//\n1,2')).toBe(3);
      expect(calculator.add('//\n1,2,3')).toBe(6);
      expect(calculator.add('//invalid\n1,2,3')).toBe(1);
    });

    test('should handle zero values', () => {
      expect(calculator.add('0')).toBe(0);
      expect(calculator.add('0,0')).toBe(0);
      expect(calculator.add('5,0')).toBe(5);
      expect(calculator.add('0,5')).toBe(5);
      expect(calculator.add('1,0,2')).toBe(3);
      expect(calculator.add('0,0,0')).toBe(0);
      expect(calculator.add('0\n0')).toBe(0);
      expect(calculator.add('1\n0\n2')).toBe(3);
      expect(calculator.add('0,0\n0')).toBe(0);
    });

    test('should throw exception for single negative number', () => {
      expect(() => calculator.add('-1')).toThrow('negatives not allowed - -1');
      expect(() => calculator.add('-5')).toThrow('negatives not allowed - -5');
      expect(() => calculator.add('-10')).toThrow('negatives not allowed - -10');
    });

    test('should throw exception for multiple negative numbers', () => {
      expect(() => calculator.add('-1,2')).toThrow('negatives not allowed - -1');
      expect(() => calculator.add('1,-2')).toThrow('negatives not allowed - -2');
      expect(() => calculator.add('-5,-3')).toThrow('negatives not allowed - -5, -3');
      expect(() => calculator.add('1,-2,3')).toThrow('negatives not allowed - -2');
      expect(() => calculator.add('-1,-2,-3')).toThrow('negatives not allowed - -1, -2, -3');
      expect(() => calculator.add('1,-2,3,-4')).toThrow('negatives not allowed - -2, -4');
    });

    test('should throw exception for negative numbers with newlines', () => {
      expect(() => calculator.add('-1\n2')).toThrow('negatives not allowed - -1');
      expect(() => calculator.add('1\n-2')).toThrow('negatives not allowed - -2');
      expect(() => calculator.add('-1\n-2\n-3')).toThrow('negatives not allowed - -1, -2, -3');
      expect(() => calculator.add('1,-2\n3')).toThrow('negatives not allowed - -2');
    });

    test('should ignore numbers bigger than 1000', () => {
      expect(calculator.add('2,1001')).toBe(2);
      expect(calculator.add('1001,2')).toBe(2);
      expect(calculator.add('1,1001,3')).toBe(4);
      expect(calculator.add('1001,1002,1003')).toBe(0);
      expect(calculator.add('1,1001,1002,3')).toBe(4);
      expect(calculator.add('1000,1001')).toBe(1000);
      expect(calculator.add('999,1000,1001')).toBe(1999);
    });

    test('should ignore numbers bigger than 1000 with newlines', () => {
      expect(calculator.add('2\n1001')).toBe(2);
      expect(calculator.add('1001\n2')).toBe(2);
      expect(calculator.add('1\n1001\n3')).toBe(4);
      expect(calculator.add('1,1001\n3')).toBe(4);
      expect(calculator.add('1\n1001,3')).toBe(4);
    });

    test('should ignore numbers bigger than 1000 with custom delimiters', () => {
      expect(calculator.add('//;\n2;1001')).toBe(2);
      expect(calculator.add('//|\n1001|2')).toBe(2);
      expect(calculator.add('//*\n1*1001*3')).toBe(4);
      expect(calculator.add('//#\n1001#1002#1003')).toBe(0);
      expect(calculator.add('//@\n1@1001@1002@3')).toBe(4);
    });

    test('should handle edge case of exactly 1000', () => {
      expect(calculator.add('1000')).toBe(1000);
      expect(calculator.add('999,1000')).toBe(1999);
      expect(calculator.add('1000,1001')).toBe(1000);
      expect(calculator.add('999,1000,1001')).toBe(1999);
    });

    test('should handle invalid number strings gracefully', () => {
      expect(calculator.add('abc')).toBe(0);
      expect(calculator.add('1,abc')).toBe(1);
      expect(calculator.add('abc,2')).toBe(2);
      expect(calculator.add('abc,def')).toBe(0);
      expect(calculator.add('1,abc,3')).toBe(4);
      expect(calculator.add('abc,2,def')).toBe(2);
      expect(calculator.add('1,abc,3,def')).toBe(4);
      expect(calculator.add('1\nabc')).toBe(1);
      expect(calculator.add('abc\n2')).toBe(2);
      expect(calculator.add('1,abc\n3')).toBe(4);
      expect(calculator.add('1\nabc,3')).toBe(4);
    });
  });
});
