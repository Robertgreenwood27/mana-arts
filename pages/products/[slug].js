  import React, { useState, useContext } from "react";
  import client from '../../sanity.config';
  import imageUrlBuilder from '@sanity/image-url';
  import CartContext from '../../components/CartContext';
  import Link from "next/link";

  const builder = imageUrlBuilder(client);

  function urlFor(source) {
    return builder.image(source);
  }

  export default function ProductPage({ product }) {
    const { addToCart } = useContext(CartContext);
    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => {
      setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    };

    const handleBackButtonClick = () => {
      window.history.back();
    }

    return (
      <div className="max-w-screen-lg mx-auto py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="md:order-1">
            <div
              className="bg-zinc-800 rounded-lg overflow-hidden"
              style={{
                width: "400px",
                height: "400px",
                backgroundColor: "black",
              }}
            >
              <img
                src={urlFor(product.image).width(400).url()}
                alt={product.name}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>
          <div className="md:order-2">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-md shadow" onClick={handleBackButtonClick}>
              <span className="ml-2">Back</span>
            </button>
            </div>
            <p className="text-2xl font-semibold mb-2">${product.price}</p>
            <p className="text-zinc-400 mb-8">{product.description}</p>
            <button
              className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-md shadow"
              onClick={() => addToCart(product, quantity)}
            >
              Add to Cart
            </button>
            <div className="flex items-center mt-2">
          <button
            className="bg-zinc-800 hover:bg-zinc-700 text-white px-2 py-1 rounded-md shadow mr-2"
            onClick={decrementQuantity}
          >
            -
          </button>
          <span className="font-bold text-xl">{quantity}</span>
          <button
            className="bg-zinc-800 hover:bg-zinc-700 text-white px-2 py-1 rounded-md shadow ml-2"
            onClick={incrementQuantity}
          >
            +
          </button>
        </div>
      </div>
    </div>
  </div>
  );
  }

  export async function getStaticPaths() {
    const products = await client.fetch(`*[_type == "product"]{ slug }`);

    const paths = products.map((product) => ({
      params: { slug: product.slug.current },
    }));

    return { paths, fallback: false };
  }

  export async function getStaticProps({ params }) {
    const product = await client.fetch(
      `*[slug.current == $slug][0]{
        _id,
        name,
        price,
        image,
        description
      }`,
      { slug: params.slug }
    );
  
    return { 
      props: { product },
      revalidate: 60 // Re-generate the page every 60 seconds
    };
  }
  
