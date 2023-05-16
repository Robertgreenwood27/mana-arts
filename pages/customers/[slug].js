import React from "react";
import Link from "next/link";
import ProductCard from '../../components/ProductCard';
import client from "../../sanity.config";
import SpinningLogo from '../../components/SpinningLogo';

export default function CustomerProductsPage({ products }) {
  return (
    <div className="bg-zinc-900 flex flex-col justify-center items-center min-h-screen"  style={{ backgroundImage: "url('/purple.png')", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
      <SpinningLogo/>
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

export async function getStaticPaths() {
  const customers = await client.fetch(
    `*[_type == "customer"]{
      slug {
        current
      }
    }`
  );

  const paths = customers.map((customer) => ({
    params: { slug: customer.slug.current },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const customer = await client.fetch(
    `*[_type == "customer" && slug.current == $slug][0]{
      products[]->{
        _id,
        name,
        price,
        description,
        "image": image.asset->url,
        slug {
          current
        }
      }
    }`,
    { slug: params.slug }
  );

  return {
    props: {
      products: customer.products,
    },
    revalidate: 60, // Re-generate the page every 60 seconds
  };
}
