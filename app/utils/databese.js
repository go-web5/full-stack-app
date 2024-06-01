import mongoose from "mongoose"

const connectDB = async() => {
  try {
    await mongoose.connect("mongodb+srv://gowebcreator:axSKv43c76Fz0Fn7@cluster0.j2enwyi.mongodb.net/nextAppDataBase?retryWrites=true&w=majority&appName=Cluster0")
    console.log("Success: Connected to MongoDB")
  } catch(err) {
    console.log("Failure: Unconnected to MongoDB")
    throw new Error()
  }
}

export default connectDB

