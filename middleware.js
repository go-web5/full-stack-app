// このファイルはアプリ全体（appフォルダ内の全て）に対して機能する
import { NextResponse } from "next/server"
import { jwtVerify } from "jose"

// ユーザーログイン状態を判定する
export async function middleware(request) {

  // ローカルストレージからトークン取り出し、HTTP Headersに格納し、request としてバックエンドに送り、取得したトークンを token に格納
  const token = await request.headers.get("Authorization")?.split(" ")[1]

  // トークンが存在してない場合
  if (!token) {
    return NextResponse.json({message: "トークンがありません"})
  }
  
  try {
    // トークンが有効な場合

    // シークレットキー生成
    // next-market-app-book という文字列をエンコードして、トークン発行に使うシークレットキーを形式に変換
    const secretKey = new TextEncoder().encode("next-market-app-book")

    // トークンの判定、シークレットキーが必要、トークンが正しい場合は、decodedJwt に格納する
    const decodedJwt = await jwtVerify(token, secretKey)

    // next は「このファイルでの処理が問題なく完了しました」という意味
    return NextResponse.next()
    
  } catch(err) {
    // トークンが無効な場合（不正なトークン、有効期限切れなど）
    return NextResponse.json({message: "トークンが正しくないので、ログインしてください"})
  }
}

// このファイルの適用範囲を制限する
// ログインユーザーだけが使える機能は、作成、編集、削除の3つ
export const config = {
  matcher: [
    "/api/item/create",
    "/api/item/update/:path*",
    "/api/item/delete/:path*"
  ],
}