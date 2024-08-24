// <form>処理などユーザーがデータを投稿する操作は、サーバーコンポーネント内では行えないのでクライアントコンポーネントに変更する。
"use client"

import { useState } from "react"

// データを送ってレスポンスを受け取る

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  console.log(email);
  console.log(password);

  const handleSubmit = async(e) => {
    e.preventDefault()

    try {
      // データの送付先（バックエンド）
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST", // 新しいデータを作成する
        headers: { // POSTリクエストで送るデータの種類やその他補足情報を追加
          "Accept": "application/json",
          "Content-type": "application/json"
        },
        body: JSON.stringify({ // JSON形式に変換して送る
          email: email,
          password: password
        })
      })
      const jsonData = await response.json()
      // Local Storage へトークンを保管する 
      // localStorage.setItem("保管するデータの名前", 保管するデータ)
      localStorage.setItem("token", jsonData.token)
      alert(jsonData.message)

    } catch(err) {
      alert("ログイン失敗")
    }
  }

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="メールアドレス" required/>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="パスワード" required/>
        <button>ログイン</button>
      </form>
    </div>
  )
}

export default Login