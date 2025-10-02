class Calculator {
  add(numbers) {
    // Handle empty string - return 0
    if (!numbers || numbers.trim() === '') {
      return 0;
    }

    // Split by comma and convert to numbers
    const numberArray = numbers.split(',');
    
    // If only one number, return it
    if (numberArray.length === 1) {
      return parseInt(numberArray[0].trim()) || 0;
    }
    
    // If two numbers, return their sum
    if (numberArray.length === 2) {
      const num1 = parseInt(numberArray[0].trim()) || 0;
      const num2 = parseInt(numberArray[1].trim()) || 0;
      return num1 + num2;
    }
    
    // For more than 2 numbers, throw error (as per requirements)
    throw new Error('Maximum 2 numbers allowed');
  }
}

module.exports = Calculator;
