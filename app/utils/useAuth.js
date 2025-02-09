import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { jwtVerify } from "jose"

const useAuth = () => {
  const [ loginUserData, setLoginUserData ] = useState({})
  
  const router = useRouter()

  const resetLoginUserData = () => {
    setLoginUserData({})
  }

  useEffect(() => {
    const checkToken = async() => {
      const token = localStorage.getItem("token")
    
      if(!token) {
        setLoginUserData({})
        router.push("/user/login")
      }
      
      try{
        const secretKey = new TextEncoder().encode("next-market-app-book")
        const decodedJwt = await jwtVerify(token, secretKey)
        setLoginUserData(
          {
            name: decodedJwt.payload.name,
            email: decodedJwt.payload.email,
          }
        )
    
      } catch(error) {
        router.push("/user/login")
      }
    }
    checkToken()
  },[router])

  return { loginUserData, resetLoginUserData }
}

export default useAuth