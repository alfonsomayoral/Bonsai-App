module.exports = function (api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        'expo-router/babel',
  
        'transform-inline-environment-variables',
        [
          '@tamagui/babel-plugin',
          {
            components: ['tamagui'],
            config: './tamagui.config.ts',
          },
        ],
  
        'react-native-reanimated/plugin',
      ],
    };
  };