import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Next Market",
  description: "不要になったものを必要としている人へ販売できるフリマアプリです。リサイクルかつお小遣い稼ぎにどうぞお使いください。",
  robots: {
    index: false,  // noindex
    follow: false, // nofollow
  }
}

const getAllItems = async() => {
  // データの投稿ではなく取得なので、body,headers,method(デフォルトはGET) の設定は不要
  // no-store → データを更新しても直ちに反映されないことがあるため、キャッシュを保存しないように設定
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readall`, {cache: "no-store"})
  const jsonData = await response.json()
  const allItems = jsonData.allItems
  return allItems
}

const ReadAllItems = async() => {
  // console.log(process.env.NEXT_PUBLIC_URL);
  const allItems = await getAllItems()

  return (
    <main className="mt-6 md:mt-8">
      <div className="grid gap-5 md:gap-10 grid-cols-2 md:grid-cols-3">
        {/* mapで分割した個々のデータには、それぞれにkeyを割り当てる必要がある */}
        {allItems.map(item =>
          <article key={item._id} className="card">
            <Link href={`/item/readsingle/${item._id}`} className="">
              <Image src={item.image} width={750} height={500} alt="item-image" priority />
              <div className="p-2 md:p-4">
                <h3 className="text-sm md:text-base font-semibold">{item.title}</h3>
                <h2 className="text-lg md:text-2xl font-semibold">¥{item.price}<span className="text-xs md:text-xs font-normal ml-1">(税込)</span></h2>
                <p className="mt-2 text-sm md:text-base">{item.description.substring(0,80)}…</p>
              </div>
            </Link>
          </article>
        )}
      </div>
    </main>
  )
}

export default ReadAllItems