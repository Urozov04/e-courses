import { model, Schema } from "mongoose";
import { types } from "util";

const reviewSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    rating: {
      type: String,
      enum: [1, 2, 3, 4, 5],
    },
    comment: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Review = model("Review", reviewSchema);
export default Review;
