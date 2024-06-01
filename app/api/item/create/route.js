import { NextResponse } from "next/server"
import connectDB from "@/app/utils/databese";
import { ItemModel } from "@/app/utils/schemaModels";

export async function POST(request) {
  const reqBody = await request.json()

  try {
    // MongoDB データベースへの接続を管理するための関数
    // 接続が成功したか失敗したかをログに記録
    await connectDB() 

    // データベースへの書き込みする、引数に書き込みたいデータを入れる
    await ItemModel.create(reqBody)

    // NextResponse は Next.js だけで使える
    return NextResponse.json({message: "アイテム作成成功"})

  } catch(err) {
    return Next.Response.json({message: "アイテム作成失敗"})
  }
}
