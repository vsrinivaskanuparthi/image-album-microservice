const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const AlbumModel = new Schema({
    name: { type: String, unique: true },
    description: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('Album', AlbumModel)