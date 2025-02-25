import React from "react";
import { Product } from "../types/types";

interface ProductListProps {
  setSelectedProduct: (params: number) => void;
  products: Product[];
  selectedProductId: number | null;
}

const ProductList: React.FC<ProductListProps> = ({
  setSelectedProduct,
  products,
  selectedProductId,
}) => {
  return (
    <div>
      <h2 className="heading">Product List</h2>
      <ul>
        {products.map((product) => {
          const shouldHighlight = product.id === selectedProductId;
          const productListClassName = shouldHighlight
            ? "product-list highlight"
            : "product-list";

          return (
            <li
              className={productListClassName}
              key={product.id}
              onClick={() => setSelectedProduct(product.id)}
            >
              {product.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductList;
