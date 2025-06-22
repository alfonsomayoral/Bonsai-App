// apps/mobile/tamagui.config.js
const { createTamagui, createFont } = require('@tamagui/core')
const { tokens, themes }           = require('@tamagui/themes')
const baseConfig                   = require('@tamagui/config/v3')

// ▸ EJEMPLO de fuente; elimina si no usas Inter
const headingFont = createFont({
  family: 'Inter',
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 22,
    6: 28,
    7: 34,
    8: 40,
    9: 46,
  },
  lineHeight: {
    1: 16,
    2: 18,
    3: 20,
    4: 22,
    5: 26,
    6: 32,
    7: 38,
    8: 44,
    9: 50,
  },
  weight: { 4: '400', 7: '700' },
})

// --- Config final ----------------------------------------------------------
module.exports = createTamagui({
  ...baseConfig,
  tokens,
  themes,
  fonts: {
    ...baseConfig.fonts,
    heading: headingFont,
  },
  // importa TODOS los componentes de los dos paquetes que realmente existen
  components: ['@tamagui/core', 'tamagui'],
})