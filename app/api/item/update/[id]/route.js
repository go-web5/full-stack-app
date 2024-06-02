import { NextResponse } from "next/server"
import connectDB from "@/app/utils/databese"
import { ItemModel } from "@/app/utils/schemaModels"

// URL を取得するために context を使用する
// context は PUT() の引数の2つ目に記述する必要があるので、1つ目には request を入れる
export async function PUT(request, context) {

  // フロントエンドや Thunder Client から送られてきた修正済みのデータを受け取る
  // request に含まれる大量のデータの中の body の中身を取得するため .json を指定する
  const reqBody = await request.json()

  try {
    // MongoDB データベースへの接続を管理するための関数
    // 接続が成功したか失敗したかをログに記録
    await connectDB()

    // 修正するため、ItemModel に格納された updateOne を使う
    // updateOne の()には id を渡すことが前提になっていないので、_id を指定して、その key には URLに入力された文字列から取得した id の context.params.id を指定する
    // updateOne の第二引数には 修正済みのデータを入れる
    await ItemModel.updateOne({_id: context.params.id}, reqBody)

    return NextResponse.json({message: "アイテム編集成功"})

  } catch(err) {
    return NextResponse.json({message: "アイテム編集失敗"})
  }
}
