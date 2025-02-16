"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import useAuth from "../../../utils/useAuth"

const UpdateItem = (context) => {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [email, setEmail] = useState("")
  const [loding, setLoding] = useState(false)

  const {loginUserData} = useAuth()
  const router = useRouter()

  useEffect(() => {
    const getSingleItem = async(id) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`, {cache: "no-store"})
      const jsonData = await response.json()
      const singleItem = jsonData.singleItem

      setTitle(singleItem.title)
      setPrice(singleItem.price)
      setImage(singleItem.image)
      setDescription(singleItem.description)
      setEmail(singleItem.email)
      setLoding(true)
    }

    getSingleItem(context.params.id)
  }, [context])

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      // Bearer は、JSON Web Tokenで慣習的に使われていて、マストではない
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/update/${context.params.id}`, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          title: title,
          price: price,
          image: image,
          description: description,
          email: loginUserData.email
        })
      })
      const jsonData = await response.json()
      alert(jsonData.message)
      router.push("/")  
      router.refresh()

    } catch(err) {
      alert("アイテム編集失敗")
    }
  }

  if(loding) {
    if(loginUserData.email === email) {
      return (
        <main>
          <h1 className="lower-header">アイテム編集</h1>
          <form onSubmit={handleSubmit}>
            <label className="user-label">
              <span>アイテム名</span> <span className="text-red-500">＊</span>
              <input className="user-input" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={50} type="text" name="title" placeholder="アイテム名" required/>
            </label>
            <label className="user-label">
              <span>価格</span> <span className="text-red-500">＊</span>
              <input className="user-input" value={price} onChange={(e) => setPrice(e.target.value)} type="number" name="price" placeholder="価格" inputMode="numeric" required/>
            </label>
            <label className="user-label">
              <span>画像</span> <span className="text-red-500">＊</span>
              <input className="user-input" value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required/>
            </label>
            <label className="user-label">
              <span>商品説明</span> <span className="text-red-500">＊</span>
              <textarea className="user-textarea" value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows={10} placeholder="商品説明" required></textarea>
            </label>
            <button className="btn-secondary">保存</button>
          </form>
        </main>
      )
    } else {
      return (
        <main>
          <h1>権限がありません</h1>
        </main>
      )
    }
  } else {
    return (
      <main> 
        <h1 >ローディング中...</h1>
      </main>
    )
  }
}

export default UpdateItem