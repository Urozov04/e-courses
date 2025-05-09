import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "author", "superadmin"],
      required: true,
      default: "user",
    },
  },
  {
    timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true }
  });

userSchema.virtual('enrollment', {
  ref: 'Enrollment',
  localField: '_id',
  foreignField: 'userId',
});

const User = model("User", userSchema);
export default User;
