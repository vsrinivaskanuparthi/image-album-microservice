
const _ = require('lodash');
const Image = require('../model/image-mongo-model');
const Album = require('../model/album-mongo-model');
const MessageService = require('../lib/queuePublisher')






const service = {
  addAlbum: function (albumData) {
    return new Promise(function (resolve, reject) {
      let album = new Album(albumData)
      album.save(function (err, response) {
        if (err) {
          reject(error)
        } else {
          resolve(response)
        }
      })
    })
  },

  deleteAlbum: function (albumId) {
    return new Promise(function (resolve, reject) {
      Image.deleteMany({ albumId: albumId }).then(images => {
        Album.findOneAndRemove({ _id: albumId }).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }).catch(error => {
        reject(error)
      });
    })
  },

  addImage: function (imageData) {
    return new Promise(function (resolve, reject) {
      let image = new Image(imageData)
      image.save(function (err, response) {
        if (err) {
          reject(error)
        } else {
          let publshData = {
            data: {
              "message": 'new image created',
              "imageId": response._id.toString(),
              "albumId": response.albumId.toString(),
              "imageName": response.name
            }
          }
          MessageService.publishMessage(publshData).then(publishResponse => {
            resolve(response)
          }).catch(error => {
            reject(error);
          })
        }
      });
    });
  },

  deleteImage: function (imageId) {
    return new Promise(function (resolve, reject) {
      Image.findOneAndRemove({ _id: imageId }).then(response => {
        let publshData = {
          data: {
            "message": 'image deleted',
            "imageId": response._id.toString(),
            "albumId": response.albumId.toString(),
            "imageName": response.name
          }
        }
        MessageService.publishMessage(publshData).then(publishResponse => {
          resolve(response)
        }).catch(error => {
          reject(error);
        })
      }).catch(error => {
        reject(error)
      })
    })
  },

  getAlbumImages: function (albumId) {
    return new Promise(function (resolve, reject) {
      let query = { albumId: albumId }
      Image.find(query).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

module.exports = service
