import MyPage from "./myPage"

export const metadata = {
  title: "アイテム作成 | Next Market",
  description: "作成したいアイテム情報を入力して作成します。",
  robots: {
    index: false,  // noindex
    follow: false, // nofollow
  }
}

const CreateItem = () => {
  return <MyPage/>
}

export default CreateItem