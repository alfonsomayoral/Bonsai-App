module.exports = function (api) {
  api.cache(true);

  return {
    // SDK 50+: `babel-preset-expo` ya incluye expo-router
    presets: ['babel-preset-expo'],
    plugins: [
      // Añadido: Asegura que process.env.NODE_ENV esté disponible.
      // Debe ir ANTES del plugin de Tamagui.
      'transform-inline-environment-variables',

      [
        '@tamagui/babel-plugin',
        {
          components: ['@tamagui/core', 'tamagui'],
          // ← apuntamos al JS puente, no al .ts
          config: './tamagui.config.js',
          logTimings: true,           // opcional (debug)
          disableExtraction: process.env.NODE_ENV === 'development',
        }
      ],

      // Reanimated SIEMPRE el último
      'react-native-reanimated/plugin'
    ]
  };
};
