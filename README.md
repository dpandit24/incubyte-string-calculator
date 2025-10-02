# String Calculator

A Node.js project that implements a string calculator with support for various delimiter formats and comprehensive test coverage using Jest.

## Features

- **Basic Operations**: Add numbers separated by commas
- **Empty String Handling**: Returns 0 for empty strings
- **Newline Delimiters**: Supports newlines as delimiters
- **Custom Delimiters**: Single character delimiters with `//delimiter\n` format
- **Bracket Delimiters**: Multi-character delimiters with `//[delimiter]\n` format
- **Multiple Delimiters**: Support for multiple delimiters with `//[delim1][delim2]\n` format
- **Negative Number Validation**: Throws exceptions for negative numbers
- **Large Number Filtering**: Ignores numbers greater than 1000
- **Comprehensive Error Handling**: Graceful handling of invalid inputs

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## Setup

1. **Clone or download the project**
   ```bash
   # If you have git
   git clone <repository-url>
   cd incubyte-string-calculator
   
   # Or simply navigate to the project directory
   cd incubyte-string-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## Running the Project

### Run the Calculator Demo
```bash
node index.js
```

This will run a demonstration of the calculator with various input examples.

### Run Tests
```bash
# Run all tests
npm test

# Run tests in watch mode (re-runs when files change)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Usage Examples

### Basic Usage
```javascript
const Calculator = require('./src/calculator');
const calculator = new Calculator();

// Basic comma separation
calculator.add('1,2,3'); // Returns 6

// Empty string
calculator.add(''); // Returns 0

// Single number
calculator.add('5'); // Returns 5
```

### Newline Delimiters
```javascript
// Newlines as delimiters
calculator.add('1\n2,3'); // Returns 6
calculator.add('1\n2\n3'); // Returns 6
```

### Custom Delimiters
```javascript
// Single character delimiter
calculator.add('//;\n1;2;3'); // Returns 6

// Multi-character delimiter
calculator.add('//[***]\n1***2***3'); // Returns 6

// Multiple delimiters
calculator.add('//[*][%]\n1*2%3'); // Returns 6
calculator.add('//[abc][def]\n1abc2def3'); // Returns 6
```

### Error Handling
```javascript
// Negative numbers throw exceptions
try {
  calculator.add('1,-2,3');
} catch (error) {
  console.log(error.message); // "negatives not allowed - -2"
}

// Numbers > 1000 are ignored
calculator.add('2,1001,3'); // Returns 5 (1001 is ignored)
```

## Supported Input Formats

| Format | Example | Result |
|--------|---------|--------|
| Empty string | `""` | `0` |
| Single number | `"5"` | `5` |
| Comma separated | `"1,2,3"` | `6` |
| Newline separated | `"1\n2\n3"` | `6` |
| Mixed delimiters | `"1,2\n3"` | `6` |
| Custom delimiter | `"//;\n1;2;3"` | `6` |
| Bracket delimiter | `"//[***]\n1***2***3"` | `6` |
| Multiple delimiters | `"//[*][%]\n1*2%3"` | `6` |

## Test Coverage

The project includes comprehensive test coverage with **54 test cases** covering:

- ✅ Basic arithmetic operations
- ✅ Empty string and edge cases
- ✅ Newline delimiter support
- ✅ Custom delimiter formats
- ✅ Multiple delimiter support
- ✅ Negative number validation
- ✅ Large number filtering (> 1000)
- ✅ Error handling and edge cases
- ✅ Whitespace handling
- ✅ Invalid input handling

## Project Structure

```
incubyte-string-calculator/
├── src/
│   └── calculator.js          # Main calculator implementation
├── tests/
│   └── calculator.test.js     # Comprehensive test suite
├── index.js                   # Demo file
├── package.json               # Project configuration
└── README.md                  # This file
```

## Development

### Adding New Features
1. Implement the feature in `src/calculator.js`
2. Add corresponding tests in `tests/calculator.test.js`
3. Run tests to ensure everything works: `npm test`

### Test Structure
Tests are organized by feature with descriptive names:
- `should return 0 for empty string`
- `should support custom delimiters with //[delimiter]\n format`
- `should handle multiple delimiters with length > 1 character`
- `should throw exception for negative numbers`

## License

ISC License - see package.json for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

---

**Note**: This project follows TDD (Test-Driven Development) principles with comprehensive test coverage ensuring reliability and maintainability.
