module.exports = function (api) {
  api.cache(true);
  return {
    // Desde SDK 50 el preset ya incluye expo-router
    presets: ['babel-preset-expo'],
    plugins: [
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          // el archivo está en esta misma carpeta
          config: './tamagui.config.ts',
          logTimings: true,          // opcional (debug)
        },
      ],
      // Reanimated SIEMPRE al final
      'react-native-reanimated/plugin',
    ],
  };
};