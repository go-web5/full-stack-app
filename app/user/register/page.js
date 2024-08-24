// <form>処理などユーザーがデータを投稿する操作は、サーバーコンポーネント内では行えないのでクライアントコンポーネントに変更する。
"use client"

import { useState } from "react"

// データを送ってレスポンスを受け取る

const Register = () => {
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  console.log(name);
  console.log(email);
  console.log(password);

  const handleSubmit = async(e) => {
    e.preventDefault()

    try {
      // データの送付先（バックエンド）
      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST", // 新しいデータを作成する
        headers: { // POSTリクエストで送るデータの種類やその他補足情報を追加
          "Accept": "application/json",
          "Content-type": "application/json"
        },
        body: JSON.stringify({ // JSON形式に変換して送る
          name: name,
          email: email,
          password: password
        })
      })
      const jsonData = await response.json()
      alert(jsonData.message)

    } catch(err) {
      alert("ユーザー登録失敗")
    }
  }

  return (
    <div>
      <h1>ユーザー登録</h1>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="名前" required/>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="メールアドレス" required/>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="パスワード" required/>
        <button>登録</button>
      </form>
    </div>
  )
}

export default Register