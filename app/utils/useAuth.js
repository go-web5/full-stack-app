"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { jwtVerify } from "jose"
import { useAuthContext } from "../context/AuthContext"

// ローカルストレージのトークンに含むemail,nameをloginUserDataにセット
const useAuth = () => {
  const [ loginUserData, setLoginUserData ] = useState({})
  const [loginBoolean, setLoginBoolean] = useAuthContext();
  
  const router = useRouter()

  useEffect(() => {
    const checkToken = async() => {
      const token = localStorage.getItem("token")
    
      if(!token) {
        setLoginUserData({})
        setLoginBoolean(false)
        // router.push("/user/login")
      }
      
      try{
        const secretKey = new TextEncoder().encode("next-market-app-book")
        // jwtVerify = ログイン後のリクエスト時にトークンの有効性を検証する
        const decodedJwt = await jwtVerify(token, secretKey)
        console.log(decodedJwt)
        setLoginUserData({
          name: decodedJwt.payload.name,
          email: decodedJwt.payload.email,
        })
    
      } catch(error) {
        // router.push("/user/login")
      }
    }
    checkToken()
  },[router, loginBoolean])

  const login = (email, name) => {
    setLoginUserData({
      name: name,
      email: email,
    }); // 状態を更新
    console.log(loginUserData);
    setLoginBoolean(true)
    router.push("/"); // トップページへ遷移
  };

  const logout = () => {
    localStorage.removeItem("token");
    setLoginUserData({});
    setLoginBoolean(false)
    router.push("/");
  };

  return { loginUserData, login, logout }
}

export default useAuth