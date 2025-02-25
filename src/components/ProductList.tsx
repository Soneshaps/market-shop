import React from "react";
import { Product } from "../types/types";
import { Rating } from "@mui/material";
import { getAvailablilityClassName } from "../utils/utils";
import { Link } from "react-router-dom";

interface ProductListProps {
  category: string[];
  setSelectedProduct: (params: number) => void;
  setSelectedCategory: (params: string) => void;
  products: Product[];
  selectedProductId: number | null;
  isProductListFetching: boolean;
}

export enum Status {
  IN_STOCK = "In Stock",
  OUT_OF_STOCK = "Out of Stock",
  LOW_STOCK = "Low Stock",
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
            <>
              <Link to={`/product/${product.id}`}>
                <li
                  className={productListClassName}
                  key={product.id}
                  onClick={() => setSelectedProduct(product.id)}
                >
                  <div className="product-list-wrapper">
                    <div className="product-list-image">
                      <img src={product.thumbnail} />
                    </div>
                    <div className="product-list-detail">
                      <div className="product-list-title"> {product.title}</div>
                      <div
                        className={getAvailablilityClassName(
                          product.availabilityStatus
                        )}
                      >
                        {product.availabilityStatus}
                      </div>
                      <div>
                        <i>{product.brand}</i>
                      </div>
                      <span className="category">{product.category}</span>
                      <div>
                        <strong>Quantity :</strong>{" "}
                        {product.minimumOrderQuantity} / {product.stock}
                      </div>
                      <Rating
                        name="read-only"
                        size="small"
                        value={product.rating}
                        readOnly
                      />
                      <div className="price">${product.price}</div>
                    </div>
                  </div>
                </li>
              </Link>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductList;
