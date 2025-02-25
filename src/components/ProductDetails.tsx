import React from "react";
import { Product } from "../types/types";

interface ProductDetailsProps {
  product: Product | null;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <>
      <h2>Product item</h2>
      {product ? (
        <div>
          <div>Name : {product.title}</div>
          <div>Brand : {product.brand}</div>
          <div>Category : {product.category}</div>
          <div>Minimum Order Quantity : {product.minimumOrderQuantity}</div>
          <div>Availability Status : {product.availabilityStatus}</div>
          <div>Price : {product.price}</div>
          <div>Rating : {product.rating}</div>
          <div>Stock : {product.stock}</div>
          <div>
            Thumbnail : <img alt={product.title} src={product.thumbnail} />
          </div>
        </div>
      ) : (
        "No Product Selected. Please select a product from the list."
      )}
    </>
  );
};

export default ProductDetails;
