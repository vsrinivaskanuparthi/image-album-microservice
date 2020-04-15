const mongoose = require('mongoose')


const Schema = mongoose.Schema;

const ImageModel = new Schema({
    albumId: {
        type: Schema.Types.ObjectId,
        ref: 'Album'
    },
    name: { type: String, unique: true },
    description: { type: String },
    image: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('Image', ImageModel)
