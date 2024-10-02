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

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// データベース操作を実行するには Model が必要。Model は Schemaをベースに生成する
export const ItemModel = mongoose.models.Item || mongoose.model("Item", ItemSchema)

export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema)
