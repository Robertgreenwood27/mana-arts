import React from "react";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "../components/ProductCard";
import client from "../sanity.config";

export default function general({ products }) {
  return (
    <div className="bg-zinc-900 flex flex-col justify-center items-center min-h-screen" style={{ backgroundImage: "url('/green.png')", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
  <div className="text-white text-center justify-center items-center">
    <h1 className="text-4xl font-bold mb-4">Mana Arts</h1>
    <Image src="/logo.png" alt="Logo" width={200} height={200} />
  </div>
  <div className="container mx-auto py-8 justify-center text-center">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 justify-items-center">
      {products.map((product) => (
        <Link key={product._id} href={`/products/${product.slug.current}`} legacyBehavior>
          <a>
            <ProductCard product={product} />
          </a>
        </Link>
      ))}
    </div>
  </div>
</div>

  );
}

export async function getStaticProps() {
  const products = await client.fetch(
    `*[_type == "product"]{
      _id,
      name,
      price,
      description,
      "image": image.asset->url,
      slug {
        current
      }
    }`
  );

  return {
    props: {
      products,
    },
  };
}