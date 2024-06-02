import { NextResponse } from "next/server"
import connectDB from "@/app/utils/databese";
import { UserModel } from "@/app/utils/schemaModels";

// POST() の引数の1つ目には request を入れる
export async function POST(request) {

  // フロントエンドや Thunder Client から送られてきた修正済みのデータを受け取る
  // request に含まれる大量のデータの中の body の中身を取得するため .json を指定する
  const reqBody = await request.json()

  try {
    // MongoDB データベースへの接続を管理するための関数
    // 接続が成功したか失敗したかをログに記録
    await connectDB() 

    // データベースへの書き込みする、引数に書き込みたいデータを入れる
    await UserModel.create(reqBody)

    // NextResponse は Next.js だけで使える
    return NextResponse.json({message: "ユーザー登録成功"})

  } catch(err) {
    return Next.Response.json({message: "ユーザー登録失敗"})
  }
}