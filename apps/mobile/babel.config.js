module.exports = function (api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        'transform-inline-environment-variables',
        'react-native-reanimated/plugin',
        [
          '@tamagui/babel-plugin',
          {
            components: ['tamagui'],
            config: './tamagui.config.ts',
          },
        ],
      ],
    };
  };