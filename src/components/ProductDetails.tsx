import React from "react";
import { Product } from "../types/types";

interface ProductDetailsProps {
  product: Product | null;
  isFetching: boolean;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  isFetching,
}) => {
  if (!product) {
    return (
      <div className="loading">
        No Product Selected. Please select a product from the list.
      </div>
    );
  }

  if (isFetching) {
    return <div className="loading">Fetching Product Details ....</div>;
  }

  return (
    <div className="product-details-wrapper">
      <div className="product-details">
        <h2 className="heading">Product item</h2>
        <div className="image">
          <img alt={product.title} src={product.thumbnail} />
        </div>
        <div>
          <span className="label">Name </span>: {product.title}
        </div>
        <div>
          <span className="label">Brand</span> : {product.brand}
        </div>
        <div>
          <span className="label">Category</span> : {product.category}
        </div>
        <div>
          <span className="label">Minimum Order Quantity</span> :{" "}
          {product.minimumOrderQuantity}
        </div>
        <div>
          <span className="label">Availability Status</span> :{" "}
          {product.availabilityStatus}
        </div>
        <div>
          <span className="label">Price</span> : ${product.price}
        </div>
        <div>
          <span className="label">Rating</span> : {Math.floor(product.rating)}
        </div>
        <div>
          <span className="label">Stock</span> : {product.stock}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
