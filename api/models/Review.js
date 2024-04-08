import mongoose from "mongoose";
const { Schema } = mongoose;

const ReviewSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  star: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  hotelId: {
    type: String,
  },
});

export default mongoose.model("Review", ReviewSchema);
