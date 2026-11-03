const { defineConfig: DEFINE_CONFIG } = require('eslint/config');
const EXPO_CONFIG = require('eslint-config-expo/flat');

module.exports = DEFINE_CONFIG([EXPO_CONFIG, { ignores: ['ios/**', 'android/**', 'work/**'] }]);
