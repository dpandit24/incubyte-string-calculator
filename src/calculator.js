class Calculator {
  add(numbers) {
    // Handle empty string - return 0
    if (!numbers || numbers.trim() === '') {
      return 0;
    }

    let delimiter = ',';
    let numberString = numbers;

    // Check for custom delimiter format: //[delimiter]\n[numbers...]
    if (numbers.startsWith('//')) {
      const delimiterMatch = numbers.match(/^\/\/(.+)\n/);
      if (delimiterMatch && delimiterMatch[1] && delimiterMatch[1].trim() !== '') {
        delimiter = delimiterMatch[1];
        numberString = numbers.substring(delimiterMatch[0].length);
      }
    }

    // Split by delimiter and newline, then convert to numbers
    const numberArray = numberString.split(new RegExp(`[${delimiter}\n]+`));
    
    // Calculate sum of all numbers
    let sum = 0;
    for (const num of numberArray) {
      const parsedNum = parseInt(num.trim());
      if (!isNaN(parsedNum)) {
        sum += parsedNum;
      }
    }
    
    return sum;
  }
}

module.exports = Calculator;
