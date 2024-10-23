import Image from "next/image"
import Link from "next/link"

export async function generateMetadata(context) {
  const singleItem = await getSingleItem(context.params.id) 
  return { 
    title: `${singleItem.title} | Next Market`,
    description: singleItem.description,
    robots: {
      index: false,  // noindex
      follow: false, // nofollow
    }
  }
}

const getSingleItem = async(id) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`, {cache: "no-store"})
  const jsonData = await response.json()
  const singleItem = jsonData.singleItem
  return singleItem
}

const ReadSingleItem = async(context) => {
  const singleItem = await getSingleItem(context.params.id)
  console.log(singleItem);

  return (
    <main className="mt-6 md:mt-8">
      <div className="grid grid-cols-1 md:grid-cols-10 gap-2 md:gap-6">
        <div className="grid-cols-1 md:col-span-6">
          <Image src={singleItem.image} width={750} height={500} alt="item-image" priority/>
        </div>
        <div className="grid-cols-1 md:col-span-4">
          <h1 className="text-sm md:text-base font-semibold">{singleItem.title}</h1>
          <h2 className="text-lg md:text-2xl font-semibold">¥{singleItem.price}</h2>
          <hr/>
          <p className="mt-4 text-sm md:text-base">{singleItem.description}</p>
          <ul className="flex gap-2 mt-4">
            <li className="btn-primary">
              <Link href={`/item/update/${singleItem._id}`}>アイテム編集</Link>
            </li>
            <li className="btn-primary">
              <Link href={`/item/delete/${singleItem._id}`}>アイテム削除</Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}

export default ReadSingleItem