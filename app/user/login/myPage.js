// <form>処理などユーザーがデータを投稿する操作は、サーバーコンポーネント内では行えないのでクライアントコンポーネントに変更する。
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import useAuth from "@/app/utils/useAuth"

// データを送ってレスポンスを受け取る

const Login = () => {

  const {login} = useAuth()
  const [newUser, setNewUser] = useState({
    email: "",
    password: ""
  })

  const router = useRouter()
  
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/login`, {
        method: "POST", // 新しいデータを作成する
        headers: { // POSTリクエストで送るデータの種類やその他補足情報を追加
          "Accept": "application/json",
          "Content-type": "application/json"
        },
        // JSON形式に変換して送る
        body: JSON.stringify(newUser)
      })
      const jsonData = await response.json()
      // Local Storage へトークンを保管する 
      // localStorage.setItem("保管するデータの名前", 保管するデータ)
      localStorage.setItem("token", jsonData.token)
      alert(jsonData.message)
      login(jsonData.email, jsonData.name); // 状態を更新 & トップページへリダイレクト
      router.refresh()

    } catch(err) {
      alert("ログイン失敗")
    }
  }

  return (
    <main>
      <h1 className="lower-header">ログイン</h1>
      <form onSubmit={handleSubmit}>
        <label className="user-label">
          <span>メールアドレス</span> <span className="text-red-500">＊</span>
          <input className="user-input" value={newUser.email} onChange={handleChange} type="text" name="email" placeholder="メールアドレス" required/>
        </label>
        <label className="user-label">
          <span>パスワード</span> <span className="text-red-500">＊</span>
          <input className="user-input" value={newUser.password} onChange={handleChange} type="text" name="password" placeholder="パスワード" required/>
        </label>
        <button className="btn-secondary">ログイン</button>
      </form>
    </main>
  )
}

export default Login