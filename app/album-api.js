
const joi = require('joi')
const Boom = require('boom')
const service = require('./album-service')
const Album = require('./album-model')
const Image = require('./image-model')
const pack = require('../package.json')
const errors = require('./error-simulator-api')

// health check for microservice
const health = {
  method: 'GET',
  path: '/health',
  config: {
    tags: ['api'],
    description: 'Health check API',
    plugins: {
      'hapi-swagger': {
        responses: {
          200: {
            description: 'Success',
            schema: joi.object({
              status: joi.string().description('Microservice status').example('ok'),
              version: joi.string().description('Microservice version').example('1.0.0')
            })
          },
          400: { description: 'Bad Request' },
          500: { description: 'Internal Error' }
        }
      }
    }
  },
  handler: function (request, reply) {
    reply({
      status: 'ok',
      version: pack.version,
      message:'image store microservice is in running state'
    })
  }
}

//save album
const saveAlbum = {
  method: 'POST',
  path: '/album',
  config: {
    tags: ['api'],
    description: 'Create a new album',
    notes: 'Create a new album',
    plugins: {
      'hapi-swagger': {
        responses: {
          200: {
            description: 'Success',
            schema: joi.object(Album.schema()).label('Album')
          },
          400: { description: 'Bad request' },
          500: { description: 'Internal Error' }
        }
      }
    },
    validate: {
      options: {
        allowUnknown: false
      },
      payload: Album.schema()
    }
  },
  handler: function (request, reply) {
    let payload = request.payload
    let result = service.addAlbum(payload)
    result.then((album) => {
      return reply(album)
    }).catch((err) => {
      return reply(new Error(err))
    })
  }
}

//delete album along with respective images
const deleteAlbum = {
  method: 'DELETE',
  path: '/album/{albumId}',
  config: {
    tags: ['api'],
    description: 'Delete an album',
    notes: 'Delete an album by albumId',
    plugins: {
      'hapi-swagger': {
        responses: {
          204: { description: 'Success' },
          404: { description: 'Album does not exist' },
          500: { description: 'Internal Error' }
        }
      }
    },
    validate: {
      params: {
        albumId: joi.string()
      }
    }
  },
  handler: function (request, reply) {
    let result = service.deleteAlbum(request.params.albumId)
    result.then((response) => {
      return reply({ status: 200, message: 'album deleted successfully' }).code(200)
    }).catch((err) => {
      switch (err) {
        case 'NOT_FOUND':
          reply(Boom.notFound())
          break
        default:
          reply(new Error(err))
      }
    })
  }
}

//save images of album
const saveImage = {
  method: 'POST',
  path: '/image',
  config: {
    tags: ['api'],
    description: 'Create a new image in existed album',
    notes: 'Create a new image',
    plugins: {
      'hapi-swagger': {
        responses: {
          200: {
            description: 'Success',
            schema: joi.object(Image.schema()).label('Image')
          },
          400: { description: 'Bad request' },
          500: { description: 'Internal Error' }
        }
      }
    },
    validate: {
      options: {
        allowUnknown: false
      },
      payload: Image.schema()
    }
  },
  handler: function (request, reply) {
    let payload = request.payload
    let result = service.addImage(payload)
    result.then((image) => {
      return reply(image)
    }).catch((err) => {
      return reply(new Error(err))
    })
  }
}

//delete image of a album with imageId
const deleteImage = {
  method: 'DELETE',
  path: '/image/{imageNumber}',
  config: {
    tags: ['api'],
    description: 'Delete an image from existed album',
    notes: 'Delete an image by imageNumber',
    plugins: {
      'hapi-swagger': {
        responses: {
          204: { description: 'Success' },
          404: { description: 'Image does not exist' },
          500: { description: 'Internal Error' }
        }
      }
    },
    validate: {
      params: {
        imageNumber: joi.string()
      }
    }
  },
  handler: function (request, reply) {
    let result = service.deleteImage(request.params.imageNumber)
    result.then((response) => {
      return reply({ status: 200, message: 'album deleted successfully' }).code(200)
    }).catch((err) => {
      switch (err) {
        case 'NOT_FOUND':
          reply(Boom.notFound())
          break
        default:
          reply(new Error(err))
      }
    })
  }
}

//get album images with album Id
const getAlbumImages = {
  method: 'GET',
  path: '/album/images/{albumId}',
  config: {
    tags: ['api'],
    description: 'Get album images by albumId',
    notes: 'Get images by albumId',
    plugins: {
      'hapi-swagger': {
        responses: {
          200: { description: 'Success' },
          400: { description: 'Bad request' },
          404: { description: 'album does not exist' },
          500: { description: 'Internal Error' }
        }
      }
    },
    validate: {
      params: {
        albumId: joi.string()
      }
    }
  },
  handler: function (request, reply) {
    let result = service.getAlbumImages(request.params.albumId)
    result.then((images) => {
      return reply(images)
    }).catch((err) => {
      if (err === 'NOT_FOUND') {
        return reply(Boom.notFound())
      } else {
        return reply(new Error(err))
      }
    })
  }
}

const freeze = errors.freeze
const crash = errors.crash

module.exports = {
  routes: [health, crash, freeze, saveAlbum, deleteAlbum, saveImage, deleteImage, getAlbumImages],
  freeze,
  crash,
  health,
  saveAlbum,
  deleteAlbum,
  saveImage,
  deleteImage,
  getAlbumImages
}
