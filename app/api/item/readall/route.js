import { NextResponse } from "next/server"
import connectDB from "@/app/utils/databese"
import { ItemModel } from "@/app/utils/schemaModels"

export async function GET() {
  try {
    // MongoDB データベースへの接続を管理するための関数
    // 接続が成功したか失敗したかをログに記録
    await connectDB()

    // 全てのアイテムデータの読み取りをしたいので、 ItemModel に格納された find() を使う
    const allItems = await ItemModel.find()
    
    return NextResponse.json({massage: "アイテム読み取り成功（オール）", allItems: allItems})

  } catch(err) {
    return NextResponse.json({message: "アイテム読み取り失敗（オール）"})
  }
}