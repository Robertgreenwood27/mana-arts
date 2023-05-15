//components/productCard.js
import React, { useContext } from "react";
import { urlFor } from "../imageUrlBuilder";

export default function ProductCard({ product }) {
  return (
    <div
      key={product._id}
      className="bg-zinc-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg border"
      style={{
        width: "300px",
        backgroundColor: "black"
      }}
    >
      <div className="relative h-64 min-h-64">
        <img
          src={urlFor(product.image).url()}
          alt={product.name}
          className="w-full h-full object-contain rounded-lg"
          style={{ width: "100%", maxHeight: "100%" }}
        />
      </div>
      <div className="p-2 bg-zinc-900 bg-opacity-75 text-white rounded-b-lg flex flex-row">
        <h2 className="text-xl font-semibold flex-1">{product.name}</h2>
        <span className="text-lg font-bold">${product.price}</span>
      </div>
    </div>
  );
}
