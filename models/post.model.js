const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String },
    price: { type: String },
    description: { type: String }, 
    images: [{url: String, public_id: String}],
    location: { type: String },
    lat: { type: Number },
    lng: { type: Number },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});


module.exports = mongoose.model('Post', PostSchema);
