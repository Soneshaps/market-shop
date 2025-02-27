import React, { useEffect, useState } from "react";
import { Product } from "../types/types";

import { useParams } from "react-router-dom";
import { getProductById } from "../api/product.api";
import ProductDetails from "../components/ProductDetailsComponent";

const ProductDetailsWrapper: React.FC = () => {
  const { id } = useParams();
  const [isFetching, setIsFetching] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      const fetchProductsDetails = async () => {
        setIsFetching(true);
        try {
          const data = await getProductById(+id);
          setProduct(data || null);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setIsFetching(false);
        }
      };

      fetchProductsDetails();
    }
  }, [id]);

  if (isFetching) {
    return <div className="loading">Fetching Product Details ....</div>;
  }

  if (!product) {
    return <div className="loading">Product Not Found</div>;
  }

  return <ProductDetails product={product} />;
};

export default ProductDetailsWrapper;
