module.exports.autoreload = {
  active: true,
  usePolling: false,
  overrideMigrateSetting: false,
  dirs: [
    'api/controllers',
    'api/helpers',
    'api/models',
    'api/policies',
    'api/responses',
    'config/locales'
  ],
  ignored: [
    // Ignore all files with .ts extension
    '**.ts'
  ]
};
