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
    ],
    avgRating: {type: Number, default: 0 }
}, {timestamps: true});


PostSchema.pre('remove', async function() {
    await Review.remove({
        _id: {
            $in: this.reviews
        }
    })
})

PostSchema.methods.calculateAvgRating = function () {
    let totalRating = 0;
    if (this.reviews.length) {
        this.reviews.forEach(review => {
            totalRating += review.rating;
        });
        this.avgRating =
          Math.round((totalRating / this.reviews.length) * 10) / 10;
    } else {
        this.avgRating = totalRating;
    }
    const floorRating = Math.floor(this.avgRating);
    this.save();
    return floorRating;
}

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', PostSchema);
