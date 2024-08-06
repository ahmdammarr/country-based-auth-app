module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:testing-library/react'],
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      // You can add specific rules for test files here if needed
    },
  ],
};
