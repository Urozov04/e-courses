import { model, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true }
  });

categorySchema.virtual('course', {
  ref: 'Course',
  localField: '_id',
  foreignField: 'category',
});


const Category = model("Category", categorySchema);
export default Category;
