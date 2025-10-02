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
    
    // Check for negative numbers and collect them
    const negatives = [];
    for (const num of numberArray) {
      const parsedNum = parseInt(num.trim());
      if (!isNaN(parsedNum) && parsedNum < 0) {
        negatives.push(parsedNum);
      }
    }
    
    // Throw exception if negative numbers found
    if (negatives.length > 0) {
      throw new Error(`negatives not allowed - ${negatives.join(', ')}`);
    }
    
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
