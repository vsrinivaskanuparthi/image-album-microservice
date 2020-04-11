const Album = require('./album-model')
const Image = require('./image-model')
const _ = require('lodash');
const mongoose = require('mongoose');

// TODO read data from database
// we use static data for now
let albumData = [new Album({
  albumNumber: "5e91842c625afc0f88e9d74b",
  name: 'wedding album',
  description: 'my wedding album',
  images: []
}), new Album({
  albumNumber: "5e91842c625afc0f88e9d75b",
  name: 'birthday album',
  description: 'my birthday album',
  images: []
})]

let imageData = [new Album({
  albumNumber: "5e91842c625afc0f88e9d74b",
  imageNumber: mongoose.Types.ObjectId(),
  name: 'image1',
  description: 'description'
}), new Album({
  albumNumber: "5e91842c625afc0f88e9d75b",
  imageNumber: mongoose.Types.ObjectId(),
  name: 'image2',
  description: 'description',
  images: []
})]

const service = {
  addAlbum: function (album) {
    return new Promise(function (resolve, reject) {
      album = new Album(album)
      let albumNumber = mongoose.Types.ObjectId().toString()
      album.albumNumber = albumNumber
      if (!album.valid()) {
        reject('INVALID')
        return
      }

      if (albumData) {
        albumData.push(album)
        resolve(album)
      } else {
        reject('FAILURE')
      }
    })
  },
  deleteAlbum: function (albumNumber) {
    return new Promise(function (resolve, reject) {
      let albumImages = _.filter(imageData, { albumNumber: albumNumber })
      if (albumImages.length) {
        albumImages.map((image) => {
          let imageIndex = _.findIndex(imageData, { albumNumber: image.albumNumber })
          if (imageIndex > -1) {
            imageData.splice(imageIndex, 1)
          }
        });
      }
      let dbAlbum = albumData.find(x => x.albumNumber === albumNumber)
      if (typeof dbAlbum === 'undefined') {
        reject('NOT_FOUND')
        return
      }
      albumData.splice(albumData.indexOf(dbAlbum), 1)
      resolve('SUCCESS')
    })
  },
  addImage: function (image) {
    return new Promise(function (resolve, reject) {
      image = new Image(image)
      let imageNumber = mongoose.Types.ObjectId().toString()
      image.imageNumber = imageNumber
      if (!image.valid()) {
        reject('INVALID')
        return
      }

      if (imageData) {
        imageData.push(image)
        resolve(image)
      } else {
        reject('FAILURE')
      }
    })
  },
  deleteImage: function (imageNumber) {
    return new Promise(function (resolve, reject) {
      let dbImage = imageData.find(x => x.imageNumber === imageNumber)
      if (typeof dbImage === 'undefined') {
        reject('NOT_FOUND')
        return
      }

      imageData.splice(imageData.indexOf(dbImage), 1)
      resolve('SUCCESS')
    })
  },
  getAlbumImages: function (albumNumber) {
    return new Promise(function (resolve, reject) {
      let albumImages = _.filter(imageData, { albumNumber: albumNumber })
      resolve(albumImages)
    })
  }
}

module.exports = service
