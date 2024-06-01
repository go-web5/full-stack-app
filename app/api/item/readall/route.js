import { NextResponse } from "next/server"
import connectDB from "@/app/utils/databese"
import { ItemModel } from "@/app/utils/schemaModels"

export async function GET() {
  try {
    await connectDB()
    const allItems = await ItemModel.find()
    return NextResponse.json({massage: "アイテム読み取り成功（オール）", allItems: allItems})

  } catch(err) {
    return NextResponse.json({message: "アイテム読み取り失敗（オール）"})
  }
}