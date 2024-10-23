import MyPage from "./myPage"

export const metadata = {
  title: "ログイン | Next Market",
  description: "ログイン情報を入力してログインします。",
  robots: {
    index: false,  // noindex
    follow: false, // nofollow
  }
}

const Login = () => {
  return <MyPage/>
}

export default Login