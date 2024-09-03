import mongoose from "mongoose";
const connectDB =  () => {
   mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Database Connection");
    })
    .catch((error) => {
      console.log(error);
    });
};
export default connectDB;
