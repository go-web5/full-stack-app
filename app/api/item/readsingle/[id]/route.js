import { NextResponse } from "next/server"
import connectDB from "@/app/utils/databese"
import { ItemModel } from "@/app/utils/schemaModels"

// URL を取得するために context を使用する
// context は GET() の引数の2つ目に記述する必要があるので、1つ目にはrequestを入れる
export async function GET(request, context) {
  // console.log(context.params.id); // id を取得

  try {
    // MongoDB データベースへの接続を管理するための関数
    // 接続が成功したか失敗したかをログに記録
    await connectDB()

    // データを一つ読み取るために findById に id を渡す
    // findById の()には id を渡すことが前提となっている
    const singleItem = await ItemModel.findById(context.params.id)

    return NextResponse.json({message: "アイテム読み取り成功（シングル）", singleItem: singleItem})
    
  } catch(err) {
    return NextResponse.json({message: "アイテム読み取り失敗（シングル）"})
  }
}
