//pages/categories/[slug].js
import React from "react";
import Link from "next/link";
import ProductCard from "../../components/ProductCard";
import client from "../../sanity.config";


export default function CategoryPage({ products }) {
  return (
    <div className="bg-zinc-900 flex flex-col justify-center items-center min-h-screen" style={{ backgroundImage: "url('/green.png')", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
      <div className="container mx-auto py-8 justify-center text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 justify-items-center">
          {products.map((product) => (
            <Link key={product._id} href={`/products/${product.slug.current}`} passHref legacyBehavior>
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

export async function getStaticPaths() {
  const categories = await client.fetch(`*[_type == "category"]{ "slug": slug.current }`);

  const paths = categories.map((category) => ({
    params: { slug: category.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const products = await client.fetch(
    `*[_type == "product" && category._ref in *[_type=="category" && slug.current == $slug]._id]{
      _id,
      name,
      price,
      description,
      "image": image.asset->url,
      slug {
        current
      }
    }`,
    { slug }    
  );
  

  return {
    props: {
      products,
    },
    revalidate: 60, // Re-generate the page every 60 seconds
  };
}
