import Image from "next/image"
import Link from "next/link"

const Header = () => {
  return (
    <header>
      <div className="pt-2 md:pt-4">
        <Link href="/">
          <Image src="/header.svg" width={1330} height={148} alt="header-image" priority/>
        </Link>
      </div>
      <nav className="mt-3 md:mt-4">
        <ul className="flex justify-end gap-2 grid-cols-3">
          <li className="btn-primary">
            <Link href="/user/register">登録</Link>
          </li>
          <li className="btn-primary">
            <Link href="/user/login">ログイン</Link>
          </li>
          <li className="btn-primary">
            <Link href="/item/create">アイテム作成</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header