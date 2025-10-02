class Calculator {
  add(numbers) {
    // Handle empty string - return 0
    if (!numbers || numbers.trim() === '') {
      return 0;
    }

    let delimiter = ',';
    let numberString = numbers;

    // Check for custom delimiter format: //[delimiter]\n[numbers...] or //[delim1][delim2]\n[numbers...]
    if (numbers.startsWith('//')) {
      // Check for multiple bracket format: //[delim1][delim2]\n
      const multipleBracketMatch = numbers.match(/^\/\/(\[.+\])+\n/);
      if (multipleBracketMatch) {
        const delimiterMatches = numbers.match(/\[([^\]]+)\]/g);
        if (delimiterMatches && delimiterMatches.length > 0) {
          const delimiters = delimiterMatches.map(match => match.slice(1, -1)); // Remove [ and ]
          delimiter = delimiters.join('|'); // Join with | for regex OR
          numberString = numbers.substring(multipleBracketMatch[0].length);
        }
      } else {
        // Check for single bracket format: //[delimiter]\n
        const bracketMatch = numbers.match(/^\/\/\[(.+)\]\n/);
        if (bracketMatch && bracketMatch[1] && bracketMatch[1].trim() !== '') {
          delimiter = bracketMatch[1];
          numberString = numbers.substring(bracketMatch[0].length);
        } else {
          // Check for simple format: //delimiter\n
          const delimiterMatch = numbers.match(/^\/\/(.+)\n/);
          if (delimiterMatch && delimiterMatch[1] && delimiterMatch[1].trim() !== '') {
            delimiter = delimiterMatch[1];
            numberString = numbers.substring(delimiterMatch[0].length);
          }
        }
      }
    }

    // Split by delimiter and newline, then convert to numbers
    // Escape special regex characters in delimiter
    const escapedDelimiter = delimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const numberArray = numberString.split(new RegExp(`[${escapedDelimiter}\n]+`));
    
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
    
    // Calculate sum of all numbers (ignore numbers > 1000)
    let sum = 0;
    for (const num of numberArray) {
      const parsedNum = parseInt(num.trim());
      if (!isNaN(parsedNum) && parsedNum <= 1000) {
        sum += parsedNum;
      }
    }
    
    return sum;
  }
}

module.exports = Calculator;
