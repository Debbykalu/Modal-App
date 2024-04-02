module.exports = {
    // Specify the root directory for Jest to search for test files
    roots: ['<rootDir>/src'],
  
    // Transform files before running tests
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
  
    testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  
    // Module file extensions for importing modules
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: ['<rootDir>/jest-setup.js']
}