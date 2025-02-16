"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import useAuth from "../../../utils/useAuth"

const DeleteItem = (context) => {
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/delete/${context.params.id}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          email: loginUserData.email
        })
      })
      const jsonData = await response.json()
      alert(jsonData.message)
      router.push("/")  
      router.refresh()

    } catch(err) {
      alert("アイテム削除失敗")
    }
  }

  if(loding) {
    if(loginUserData.email === email) {
      return (
        <main>
          <h1 className="lower-header">アイテム削除</h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-10 gap-2 md:gap-6">
              <div className="grid-cols-1 md:col-span-6">
                <Image src={image} width={750} height={500} alt="item-image" priority/>
              </div>
              <div className="grid-cols-1 md:col-span-4">
                <h2 className="text-sm md:text-base font-semibold">{title}</h2>
                <h3 className="text-lg md:text-2xl font-semibold">¥ {Number(price).toLocaleString()}<span className="text-xs md:text-xs font-normal ml-1">(税込)</span></h3>
                <hr/>
                <p className="mt-4 text-sm md:text-base">{description}</p>
                <button className="btn-secondary">削除</button>
              </div>
            </div>
          </form>
        </main>
      )
    } else {
      return <h1>権限がありません</h1>
    }
  } else {
    return <h1>ローディング中...</h1>
  }
}

export default DeleteItem