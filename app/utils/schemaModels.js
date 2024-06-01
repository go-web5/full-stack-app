import mongoose from "mongoose"

// 保存するデータの形と種類を定義
const Schema = mongoose.Schema

const ItemSchema = new Schema({
  title: String,
  image: String,
  price: String,
  description: String,
  email: String,
})

// データベース操作を実行するには Model が必要。Model は Schemaをベースに生成する
export const ItemModel = mongoose.model.Item || mongoose.model("Item", ItemSchema)
