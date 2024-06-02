import { NextResponse } from "next/server"
import connectDB from "@/app/utils/databese"
import { ItemModel } from "@/app/utils/schemaModels"

// URL を取得するために context を使用する
// context は DELETE() の引数の2つ目に記述する必要があるので、1つ目には request を入れる
export async function DELETE(request, context) {

  // 投稿するデータはないので、request.json() や reqBody は不要

  try {
    // MongoDB データベースへの接続を管理するための関数
    // 接続が成功したか失敗したかをログに記録
    await connectDB()

    // 削除するため、ItemModel に格納された deleteOne を使う
    // deleteOne の()には id を渡すことが前提になっていないので、_id を指定して、その key には URLに入力された文字列から取得した id の context.params.id を指定する
    await ItemModel.deleteOne({_id: context.params.id})

    return NextResponse.json({message: "アイテム削除成功"})

  } catch(err) {
    return NextResponse.json({message: "アイテム削除失敗"})
  }
}