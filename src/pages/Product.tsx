import React, { useEffect, useState } from "react";
import { getAllProducts, getProductById } from "../api/product.api";
import ProductDetails from "../components/ProductDetails";
import ProductList from "../components/ProductList";
import { Product as ProductType } from "../types/types";

const Product: React.FC = () => {
  // States
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );

  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedProductId) {
      const fetchProductsDetails = async () => {
        try {
          const data = await getProductById(selectedProductId);
          setSelectedProduct(data || null);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

      fetchProductsDetails();
    }
  }, [selectedProductId]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left side: Product details (or placeholder) */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <ProductDetails product={selectedProduct} />
      </div>

      {/* Right side: Product list */}
      <div
        style={{
          width: "300px",
          borderLeft: "1px solid #ccc",
          overflowY: "auto",
          padding: "20px",
        }}
      >
        <ProductList
          products={products}
          setSelectedProduct={setSelectedProductId}
        />
      </div>
    </div>
  );
};

export default Product;
