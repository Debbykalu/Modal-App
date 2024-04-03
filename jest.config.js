module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: ['<rootDir>/jest-setup.js']
}