import { NextResponse } from "next/server"
import connectDB from "@/app/utils/databese"
import { ItemModel } from "@/app/utils/schemaModels"

// URL を取得するために context を使用する
// context は DELETE() の引数の2つ目に記述する必要があるので、1つ目には request を入れる
export async function DELETE(request, context) {

  // フロントエンドや Thunder Client から送られてきた修正済みのデータを受け取る
  // request に含まれる大量のデータの中の body の中身を取得するため .json を指定する
  const reqBody = await request.json()

  try {
    // MongoDB データベースへの接続を管理するための関数
    // 接続が成功したか失敗したかをログに記録
    await connectDB()

    // データベースから更新するアイテムを探す
    const singleItem = await ItemModel.findById(context.params.id)

    // 誰がログインしているかを判定 - データベースから探したアイテムの email と、更新ボタンを押してフロントエンドから送られてきたアイテムの email を比較する
    if (singleItem.email === reqBody.email) {

      // 削除するため、ItemModel に格納された deleteOne を使う
      // deleteOne の()には id を渡すことが前提になっていないので、_id を指定して、その key には URLに入力された文字列から取得した id の context.params.id を指定する
      await ItemModel.deleteOne({_id: context.params.id})

      return NextResponse.json({message: "アイテム削除成功"})
      
    } else {
      return NextResponse.json({message: "他の人が作成したアイテムです"})
    }

  } catch(err) {
    return NextResponse.json({message: "アイテム削除失敗"})
  }
}