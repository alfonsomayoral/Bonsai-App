const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot   = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');
const config = getDefaultConfig(projectRoot);

const shim = path.resolve(projectRoot, 'polyfills', 'empty-shim.js');

// ⬇︎  Añade TODAS las claves que se han quejado o puedan quejarse
config.resolver.extraNodeModules = {
  ws: shim,
  'ws/lib/websocket': shim,
  'ws/lib/websocket-server': shim,
  'ws/lib/receiver': shim,
  'ws/lib/sender': shim,

  url: shim,          //  <--  nuevo  (causante de este error)
  stream: shim,
  zlib: shim,
  http: shim,
  https: shim,
  net: shim,
  tls: shim,
  crypto: shim,
  buffer: shim,
  util: shim,
  path: shim,
  fs: shim,
  os: shim,
};

config.watchFolders = [workspaceRoot];
module.exports = config;