const _ = require('lodash')
const joi = require('joi')

class Image {
  constructor (data) {
    let sanitized = Image.sanitize(data)
    Object.assign(this, sanitized)
  }

  valid () {
    let result = joi.validate(this, Image.schema())
    return result.error === null
  }

  static sanitize (data) {
    data = data || {}
    return _.pick(_.defaults(data, Image.schema()), _.keys(Image.schema()))
  }

  static schema () {
    return {
      imageNumber: joi.string(),
      albumNumber: joi.string().required(),
      name: joi.string().required(),
      description: joi.string().required()
    }
  }
}

module.exports = Image
