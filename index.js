const Calculator = require('./src/calculator');

const calculator = new Calculator();

console.log('=== Calculator Add Method Demo ===');
console.log('Empty string "":', calculator.add(''));
console.log('Single number "1":', calculator.add('1'));
console.log('Two numbers "1,2":', calculator.add('1,2'));
console.log('With spaces " 5 , 3 ":', calculator.add(' 5 , 3 '));
console.log('Negative numbers "-1,2":', calculator.add('-1,2'));
console.log('Zero values "0,0":', calculator.add('0,0'));

console.log('\n=== Demo Complete ===');
console.log('Run "npm test" to see all tests!');
