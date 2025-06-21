const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot   = __dirname;                     // apps/mobile
const workspaceRoot = path.resolve(projectRoot, '../..'); // Bonsai_App

const config = getDefaultConfig(projectRoot);

// Shim vacío para módulos Node que React-Native no tiene
const shim = path.resolve(projectRoot, 'polyfills', 'empty-shim.js');

// Mapeamos todos los imports conflictivos → shim
config.resolver.extraNodeModules = {
  ...(config.resolver.extraNodeModules || {}),

  // ws y variantes profundas
  ws: shim,
  'ws/lib/websocket': shim,
  'ws/lib/websocket-server': shim,
  'ws/lib/receiver': shim,
  'ws/lib/sender': shim,

  // core-modules de Node
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

  // Alias global para la configuración de Tamagui
  'tamagui.config': path.resolve(projectRoot, 'tamagui.config.js')
};

// Hacemos que Metro vigile la raíz del monorrepo
config.watchFolders = [workspaceRoot];

module.exports = config;