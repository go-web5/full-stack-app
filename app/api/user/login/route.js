import { NextResponse } from "next/server"
import connectDB from "@/app/utils/databese"
import { UserModel } from "@/app/utils/schemaModels"
import { SignJWT } from "jose"

// POST() の引数の1つ目には request を入れる
export async function POST(request) {

  // フロントエンドや Thunder Client から送られてきた修正済みのデータを受け取る
  // request に含まれる大量のデータの中の body の中身を取得するため .json を指定する
  const reqBody = await request.json()

  try {
    // MongoDB データベースへの接続を管理するための関数
    // 接続が成功したか失敗したかをログに記録
    await connectDB() 

    // findOne では何を目安にデータを探すか指定する必要があるので、email を指定する
    const savedUserData = await UserModel.findOne({email: reqBody.email})

    if (savedUserData) {
      // ユーザーデータが存在する場合の処理

      if (reqBody.password === savedUserData.password) {
        // パスワードが正しい場合の処理

        // シークレットキー生成
        // next-market-app-book という文字列をエンコードして、トークン発行に使うシークレットキーを形式に変換
        const secretKey = new TextEncoder().encode("next-market-app-book")

        const payload = {
          email: reqBody.email, 
        }

        // トークン発行
        // payload = トークンが含むことのできるデータ
        const token = await new SignJWT(payload)
          .setProtectedHeader({alg: "HS256"}) // アルゴリズム
          .setExpirationTime("30d") // 有効期限 1d = 1日
          .sign(secretKey)

        // NextResponse は Next.js だけで使える
        return NextResponse.json({message: "ログイン成功", token: token})

      } else {
        // パスワードが正しい場合の処理
        return NextResponse.json({message: "ログイン失敗：パスワードが間違っています"})
      }
      
    } else {
      // ユーザーデータが存在しない場合の処理
      return NextResponse.json({message: "ログイン失敗：ユーザー登録をしてください"})
    }

  } catch(err) {
    return NextResponse.json({message: "ログイン失敗"})
  }
}
