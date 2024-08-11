module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@': './src',
        },
      },
    ],
    'react-native-reanimated/plugin',
    'module:react-native-dotenv',
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};
