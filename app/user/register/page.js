// <form>処理などユーザーがデータを投稿する操作は、サーバーコンポーネント内では行えないのでクライアントコンポーネントに変更する。
"use client"

import { useState } from "react"

// データを送ってレスポンスを受け取る

const Register = () => {

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    })
  }

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
        // JSON形式に変換して送る
        body: JSON.stringify(newUser)
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
        <input value={newUser.name} onChange={handleChange} type="text" name="name" placeholder="名前" required/>
        <input value={newUser.email} onChange={handleChange} type="text" name="email" placeholder="メールアドレス" required/>
        <input value={newUser.password} onChange={handleChange} type="text" name="password" placeholder="パスワード" required/>
        <button>登録</button>
      </form>
    </div>
  )
}

export default Register