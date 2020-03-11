const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Review = require('../models/review.model');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String },
    price: { type: String },
    description: { type: String }, 
    images: [{url: String, public_id: String}],
    location: { type: String },
    coordinates: Array,
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
}, {timestamps: true});


PostSchema.pre('remove', async function() {
    await Review.remove({
        _id: {
            $in: this.reviews
        }
    })
})

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', PostSchema);
