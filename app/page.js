import Link from "next/link"
import Image from "next/image"

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
    <div className="grid-container-in">
      {/* mapで分割した個々のデータには、それぞれにkeyを割り当てる必要がある */}
      {allItems.map(item => 
        <Link href={`/item/readsingle/${item._id}`} key={item._id}>
          <Image src={item.image} width={750} height={500} alt="item-image" priority />
          <div>
            <h2>¥{item.price}</h2>
            <h3>{item.title}</h3>
            <p>{item.description.substring(0,80)}…</p>
          </div>
        </Link>  
      )}
    </div>
  )
}

export default ReadAllItems