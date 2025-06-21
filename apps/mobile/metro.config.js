const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot   = __dirname;                  // apps/mobile
const workspaceRoot = path.resolve(projectRoot, '../..'); // Bonsai_App

const config = getDefaultConfig(projectRoot);

// ►  Shim vacío para módulos Node puros
const shim = path.resolve(projectRoot, 'polyfills', 'empty-shim.js');

// ►  Intercepta TODO lo relacionado con ws + módulos Node que no existen
config.resolver.extraNodeModules = {
  // paquete ws y variantes profundas
  ws: shim,
  'ws/lib/websocket': shim,
  'ws/lib/websocket-server': shim,
  'ws/lib/receiver': shim,
  'ws/lib/sender': shim,

  // core-modules de Node que puedan aparecer
  url: shim,
  stream: shim,
  zlib: shim,
  http: shim,
  https: shim,
  net: shim,
  tls: shim,
  crypto: shim,
  buffer: shim,
  util: shim,
  fs: shim,
  os: shim,
  // (NO incluimos 'path': Tamagui lo necesita)

  // alias global para importar la configuración de Tamagui
  'tamagui.config': path.resolve(
    workspaceRoot,
    'apps/mobile/tamagui.config.js' // referencia al .js emitido por TS
  ),
};

// ►  Haz que Metro observe la raíz del monorrepo
config.watchFolders = [workspaceRoot];

module.exports = config;