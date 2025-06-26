const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  
  // GARANTA QUE ESTA LINHA ESTEJA ASSIM:
  testMatch: ['**/__tests__/**/*.test.ts'],

  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};