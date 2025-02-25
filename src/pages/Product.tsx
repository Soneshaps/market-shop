import React, { useEffect, useState } from "react";
import { getAllProducts, getProductById } from "../api/product.api";
import ProductDetails from "../components/ProductDetails";
import ProductList from "../components/ProductList";
import { Product as ProductType } from "../types/types";
import { filterProductsByCategory, getUniqueCategories } from "../utils/utils";
import { Pagination } from "@mui/material";

const DEFAULT_PAGE = 1;

const Product: React.FC = () => {
  // States
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [isProductListFetching, setIsProductListFetching] =
    useState<boolean>(false);

  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );

  const [products, setProducts] = useState<ProductType[]>([]);

  const [filteredProducts, setFilteredProducts] =
    useState<ProductType[]>(products);

  const [isProductDetailFetching, setIsProductDetailFetching] =
    useState<boolean>(false);

  const [category, setCategory] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [paginationConfig, setPaginationConfig] = useState({
    totalPage: 0,
    currentPage: 0,
  });

  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE);

  console.log({ paginationConfig });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log({ value });
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
        const data = await getAllProducts(pageNumber);
        setProducts(data.products || []);
        setFilteredProducts(data.products || []);
        setCategory(getUniqueCategories(data.products));
        setPaginationConfig({
          totalPage: Math.ceil(data.total / 20),
          currentPage: data.skip / 20 + 1,
        });
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setIsProductListFetching(false);
      }
    };

    fetchProducts();
  }, [pageNumber]);

  useEffect(() => {
    if (selectedProductId) {
      const fetchProductsDetails = async () => {
        setIsProductDetailFetching(true);
        try {
          const data = await getProductById(selectedProductId);
          setSelectedProduct(data || null);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setIsProductDetailFetching(false);
        }
      };

      fetchProductsDetails();
    }
  }, [selectedProductId]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          width: "300px",
          borderLeft: "1px solid #ccc",
          overflowY: "auto",
          padding: "32px",
        }}
      >
        <ProductList
          isProductListFetching={isProductListFetching}
          setSelectedCategory={setSelectedCategory}
          category={category}
          products={filteredProducts}
          selectedProductId={selectedProductId}
          setSelectedProduct={setSelectedProductId}
        />
        <div className="pagination">
          <Pagination
            size="small"
            count={paginationConfig.totalPage}
            page={paginationConfig.currentPage}
            onChange={handleChange}
          />
        </div>
      </div>
      {/* Left side: Product details (or placeholder) */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <ProductDetails
          product={selectedProduct}
          isFetching={isProductDetailFetching}
        />
      </div>

      {/* Right side: Product list */}
    </div>
  );
};

export default Product;
