import { NextResponse } from "next/server"
import connectDB from "@/app/utils/databese"
import { ItemModel } from "@/app/utils/schemaModels"

export async function PUT(request, context) {
  // フロントエンドや Thunder Client から送られてきた修正済みのデータを受け取る
  const reqBody = await request.json()

  try {
    // MongoDB データベースへの接続を管理するための関数
    // 接続が成功したか失敗したかをログに記録
    await connectDB()

    // ItemModel に格納された updateOne 
    // URL に入力された文字列を取得するため
    // updateOne の()には id を渡すことが前提となっていないので、_id を指定する
    await ItemModel.updateOne({_id: context.params.id}, reqBody)
    
    return NextResponse.json({message: "アイテム編集成功"})

  } catch(err) {
    return NextResponse.json({message: "アイテム編集失敗"})
  }
}
