import mongoose, { Schema } from "mongoose";

const ratingSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        bookTitle: {
            type: String,
            required: true,
        },

        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5
        },

        review: {
            type: String
        },

        bookCover: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

export const Rating = mongoose.model('Rating', ratingSchema);