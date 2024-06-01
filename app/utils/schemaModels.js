import mongoose from "mongoose"

const Schema = mongoose.Schema

const ItemSchema = new Schema({
  title: String,
  image: String,
  price: String,
  description: String,
  email: String,
})

// データベース操作を実行するには Model が必要
export const ItemModel = mongoose.model.Item || mongoose.model("Item", ItemSchema)
