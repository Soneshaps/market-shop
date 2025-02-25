import React from "react";
import { Product } from "../types/types";

interface ProductListProps {
  setSelectedProduct: (params: number) => void;
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({
  setSelectedProduct,
  products,
}) => {
  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id} onClick={() => setSelectedProduct(product.id)}>
            {product.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
