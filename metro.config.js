// Learn more: https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// expo-sqlite no web usa wa-sqlite, que carrega um arquivo .wasm.
// Sem isso o Metro não sabe resolver o import do "./wa-sqlite.wasm".
config.resolver.assetExts.push('wasm');

// wa-sqlite usa SharedArrayBuffer, que só fica disponível no browser
// se a página for servida com esses dois headers (COEP/COOP).
config.server.enhanceMiddleware = (middleware) => {
  return (req, res, next) => {
    res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    return middleware(req, res, next);
  };
};

module.exports = config;
