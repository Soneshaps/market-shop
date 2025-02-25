import React, { useEffect, useState } from "react";
import { getAllProducts, getProductById } from "../api/product.api";
import ProductDetails from "../components/ProductDetails";
import ProductList from "../components/ProductList";
import { Product as ProductType } from "../types/types";
import { filterProductsByCategory, getUniqueCategories } from "../utils/utils";
import { Pagination } from "@mui/material";
import { Route, Routes, useSearchParams } from "react-router-dom";

const DEFAULT_PAGE = 1;

const Product: React.FC = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  // States
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [isProductListFetching, setIsProductListFetching] =
    useState<boolean>(false);

  const [products, setProducts] = useState<ProductType[]>([]);

  const [filteredProducts, setFilteredProducts] =
    useState<ProductType[]>(products);

  const [category, setCategory] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [paginationConfig, setPaginationConfig] = useState({
    totalPage: 0,
    currentPage: 0,
  });

  const [pageNumber, setPageNumber] = useState(page || DEFAULT_PAGE);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
    setPaginationConfig({ ...paginationConfig, currentPage: value });
  };

  useEffect(() => {
    setFilteredProducts(filterProductsByCategory(products, selectedCategory));
  }, [selectedCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsProductListFetching(true);
      try {
        const data = await getAllProducts(+pageNumber);
        setProducts(data.products || []);
        setFilteredProducts(data.products || []);
        setCategory(getUniqueCategories(data.products));
        setPaginationConfig({
          totalPage: Math.ceil(data.total / 20),
          currentPage: data.skip / 20 + 1,
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsProductListFetching(false);
      }
    };

    fetchProducts();
  }, [pageNumber]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          width: "350px",
          borderRight: "1px solid #ccc",
          overflowY: "auto",
          padding: "32px 20px 32px 32px",
        }}
      >
        <ProductList
          isProductListFetching={isProductListFetching}
          setSelectedCategory={setSelectedCategory}
          category={category}
          products={filteredProducts}
          selectedProductId={selectedProductId}
          setSelectedProduct={setSelectedProductId}
          pageNumber={+pageNumber}
        />
        <div className="pagination">
          <Pagination
            size="small"
            showFirstButton
            showLastButton
            count={paginationConfig.totalPage}
            page={paginationConfig.currentPage}
            onChange={handleChange}
          />
        </div>
      </div>
      {/* Left side: Product details (or placeholder) */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route
            path="*"
            element={
              <div className="loading">
                No Product Selected. Please select a product from the list.
              </div>
            }
          />
        </Routes>
      </div>

      {/* Right side: Product list */}
    </div>
  );
};

export default Product;
