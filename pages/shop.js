import React from "react";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "../components/ProductCard";
import client from "../sanity.config";

export default function IndexPage({ products }) {
  return (
    <div className="bg-zinc-900 flex flex-col justify-center items-center min-h-screen">
      <div className="container mx-auto py-8">
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
    revalidate: 600,
  };
}
