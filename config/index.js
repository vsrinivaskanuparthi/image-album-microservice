const pkg = require('../package')

const config = {
  server: {
    port: process.env.PORT || 8000
  },
  api: {
    version: pkg.version,
    docs: '/docs'
  }
}

module.exports = config
