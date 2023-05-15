import React from "react";
import Link from "next/link";
import client from "../sanity.config";

export default function GeneralPage({ categories }) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen" style={{ backgroundImage: "url('/green.png')", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
      <div className="container mx-auto py-8 justify-center text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 justify-items-center">
          {categories.map((category) => (
            <Link key={category.name} href={`/categories/${category.slug}`} passHref legacyBehavior>
              <a className="bg-zinc-800 rounded-lg shadow-lg p-1 flex flex-col items-center">
                <img src={`/${category.name}.png`} alt={category.name} className="mb-2 rounded-lg" style={{
        width: "300px",
        backgroundColor: "black"
      }}/>
                <h3 className="text-xl font-bold text-zinc-300">{category.name}</h3>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const categories = await client.fetch(
    `*[_type == "category"]{
      _id,
      name,
      "slug": slug.current,
      "image": products[0].image.asset->url
    }`
  );
  return {
    props: {
      categories,
    },
  };
}
