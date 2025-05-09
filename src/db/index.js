import { connect } from "mongoose";

export const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log("Successfully connect to database");
  } catch (error) {
    console.log(`Error on connecting to database: ${error}`);
  }
};
