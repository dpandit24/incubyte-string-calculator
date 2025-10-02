class Calculator {
  add(numbers) {
    // Handle empty string - return 0
    if (!numbers || numbers.trim() === '') {
      return 0;
    }

    // Split by comma and newline, then convert to numbers
    const numberArray = numbers.split(/[,\n]+/);
    
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
