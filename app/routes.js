const albumApi = require('./album-api')

const register = (server) => {
  let routes = albumApi.routes
  for (var i = 0; i < routes.length; i++) {
    server.route(routes[i])
  }
}

module.exports = { register }
