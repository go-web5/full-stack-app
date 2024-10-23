import MyPage from "./myPage"

export const metadata = {
  title: "ユーザー登録 | Next Market",
  description: "ユーザー情報を入力してユーザー登録します。",
  robots: {
    index: false,  // noindex
    follow: false, // nofollow
  }
}

const Register = () => {
  return <MyPage/>
}

export default Register