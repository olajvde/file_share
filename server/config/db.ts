import Mongoose from "mongoose";

const connectDB = async () => {
  try {
    await Mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log("Connection Error ", error.message);
  }

  const connection = Mongoose.connection;
  if (connection.readyState >= 1) {
    console.log("Connected to database");
    return;
  }
  connection.on("error", () => console.log("Connection error"));
};

export default connectDB;
