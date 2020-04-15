const _ = require('lodash')
const joi = require('joi')

class Album {
  constructor (data) {
    let sanitized = Album.sanitize(data)
    Object.assign(this, sanitized)
  }

  valid () {
    let result = joi.validate(this, Album.schema())
    return result.error === null
  }

  static sanitize (data) {
    data = data || {}
    return _.pick(_.defaults(data, Album.schema()), _.keys(Album.schema()))
  }

  static schema () {
    return {
      name: joi.string().required(),
      description: joi.string().required()
    }
  }
}

module.exports = Album
