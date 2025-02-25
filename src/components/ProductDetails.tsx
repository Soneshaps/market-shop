import React, { useEffect, useState } from "react";
import { Product } from "../types/types";
import { Rating } from "@mui/material";
import { discountedPrice, getAvailablilityClassName } from "../utils/utils";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/product.api";

const ProductDetails: React.FC = () => {
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

  return (
    <div className="product-details-wrapper">
      <div className="product-details">
        <div className="images">
          <div className="main-image">
            <img alt={product.title} src={product.images[0]} />
          </div>

          <div className="secondary-images">
            <div className="secondary-top-images">
              <div style={{ flex: 1 }}>
                <img alt={product.title} src={product.images[0]} />
              </div>
              <div style={{ flex: 1 }}>
                <img alt={product.title} src={product.images[0]} />
              </div>
            </div>
            <div className="secondary-bottom-images">
              <img alt={product.title} src={product.images[0]} />
            </div>
          </div>
        </div>
        <div className="product-descriptions">
          <div className="product-description-details">
            <div className="product-descriptions-title">{product.title}</div>
            <Rating
              className="product-rating"
              name="read-only"
              size="small"
              value={product.rating}
              readOnly
            />
            <div
              className={getAvailablilityClassName(product.availabilityStatus)}
            >
              {product.availabilityStatus}
            </div>
            <div className="policy">{product.returnPolicy}</div>
            <div>
              {product.tags.map((tag) => {
                return <span className="tags">{tag}</span>;
              })}
            </div>
          </div>
          <div>
            <div className="product-descriptions-price-label">Total Price</div>
            <div className="product-descriptions-price">
              <div className="discount-price">
                ${discountedPrice(product.discountPercentage, product.price)}
              </div>
              <div className="real-price">
                <s>${product.price}</s>
              </div>
            </div>
          </div>
          <div>
            <div className="product-descriptions-price-label">
              Minimum Order Quantity
            </div>
            <div className="product-descriptions-price">
              {product.minimumOrderQuantity}
            </div>
          </div>
        </div>
        <div className="descriptions">
          Descriptions
          <div className="descriptions-details">{product.description}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
