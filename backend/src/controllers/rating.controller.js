import { Rating } from "../models/rating.model.js";

// Create a rating
const createRating = async (req, res) => {
    try{
        const { bookTitle, rating, review, bookCover, read } = req.body;

        if( !bookTitle || rating == null || typeof read !== 'boolean' ){
            return res.status(400).json({
                message: "Book title and rating are required"
            });
        }

        const newRating = await Rating.create({ 
            user: req.user.id, 
            bookTitle, 
            rating: Number(rating),
            review,
            bookCover,
            read
        });
        res.status(201).json({
            message: "Review created successfully", 
            rating: newRating
        });
    } catch (error){
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

// Get ratings belonged to logged-in user
const getRatings = async (req, res) => {
    try{
        const ratings = await Rating.find({
            user: req.user.id
        });

        res.status(200).json(ratings);

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

// const updatePost = async (re, res) => {
//     try{
//         // basic validation to check if the body is empty

//         // {name: x, description: y, age: z} -> [name, desription, age]
//         // {} = truthy 
//         if(Object.keys(req.body).length === 0){
//             return res.status(400).json({
//                 message: "No data provided for update"
//             });
//         }

//         const post = await Post.findByIdAndUpdate(req.params.id, req.body,
//             {new: true}
//         )

//     } catch (error){

//     }
// }

export {
    createRating,
    getRatings
};