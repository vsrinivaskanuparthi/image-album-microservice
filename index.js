const hapi = require('hapi')
const swagger = require('hapi-swagger')
const inert = require('inert')
const vision = require('vision')
const connect = require('mongoose').connect
const config = require('./config')
const routes = require('./app/routes')
const dotenv = require('dotenv')

const server = new hapi.Server()

dotenv.config()

server.connection({
  host: '0.0.0.0',
  port: config.server.port,
  routes: {
    cors: true
  }
})

routes.register(server)

const swaggerPlugin = {
  register: swagger,
  options: {
    info: {
      title: 'Image-Album Microservice API Documentation',
      version: config.api.version
    },
    documentationPath: config.api.docs
  }
}

const plugins = [
  inert,
  vision,
  swaggerPlugin
]

// register plugins and start the server on the callback if all is good
server.register(plugins, (err) => {
  if (err) throw err

  server.start((startErr) => {
    if (startErr) {
      throw startErr
    }

    console.log(`Server is running:`, { pid: process.pid, uri: server.info.uri })
  })
})

connect(process.env.DATASOURCE_URL, (err, res) => {
  if (err) {
      console.log(err);
  } else {
      console.log('connected to mongodb');
  }
})

module.exports = server
