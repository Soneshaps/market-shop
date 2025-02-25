import React from "react";
import { Product } from "../types/types";

interface ProductListProps {
  category: string[];
  setSelectedProduct: (params: number) => void;
  setSelectedCategory: (params: string) => void;
  products: Product[];
  selectedProductId: number | null;
  isProductListFetching: boolean;
}

const ProductList: React.FC<ProductListProps> = ({
  setSelectedProduct,
  products,
  selectedProductId,
  category,
  setSelectedCategory,
  isProductListFetching,
}) => {
  if (isProductListFetching) {
    return <div className="loading">Fetching Product Lists ....</div>;
  }
  return (
    <div>
      <div className="product-list-header">
        <h2 className="heading">Products</h2>
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="" disabled selected>
            Category
          </option>
          <option className="product-sort-option" value="All">
            All
          </option>
          {category.map((data) => {
            return (
              <option className="product-sort-option" value={data}>
                {data}
              </option>
            );
          })}
        </select>
      </div>
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
