module.exports = function (api) {
  api.cache(true);

  return {
    // SDK 50+: `babel-preset-expo` ya incluye expo-router
    presets: ['babel-preset-expo'],
    plugins: [
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          // ← apuntamos al JS puente, no al .ts
          config: './tamagui.config.js',
          logTimings: true           // opcional (debug)
        }
      ],

      // Reanimated SIEMPRE el último
      'react-native-reanimated/plugin'
    ]
  };
};
