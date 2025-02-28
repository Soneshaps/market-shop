import { Divider, IconButton, Rating, useMediaQuery } from "@mui/material";
import { Product } from "../types/types";
import { discountedPrice, getAvailablilityClassName } from "../utils/utils";
import ReviewSection from "./ReviewSection";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const isMobile = useMediaQuery("(max-width: 870px)");

  return (
    <div className="product-details-wrapper">
      <div className="product-detail-header heading">
        <div>
          {isMobile && (
            <Link to="/">
              <IconButton aria-label="back">
                <ArrowBackIosIcon />
              </IconButton>
            </Link>
          )}
        </div>
        <h2>Product Details</h2>
        <div></div>
      </div>
      <div>
        <div className="product-details">
          <div className="images">
            <div className="main-image">
              <img alt={product.title} src={product.images[0]} />
            </div>

            <div className="secondary-images">
              <div className="product-description-details">
                <div className="product-descriptions-title">
                  {product.title}
                </div>
                <div className="product-rating">
                  <Rating
                    name="read-only"
                    size="small"
                    value={product.rating}
                    readOnly
                  />
                  ({product.reviews.length})
                </div>

                <div
                  className={getAvailablilityClassName(
                    product.availabilityStatus
                  )}
                >
                  {product.availabilityStatus} ({`${product.stock} items`})
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {product.tags.map((tag, index) => {
                    return (
                      <span key={index} className="tags">
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="product-descriptions">
                <div>
                  <div className="product-descriptions-price-label">
                    TOTAL PRICE
                  </div>
                  <div className="product-descriptions-price">
                    <div className="discount-price">
                      $
                      {discountedPrice(
                        product.discountPercentage,
                        product.price
                      )}
                    </div>
                    <div className="real-price">
                      <s>${product.price}</s>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="product-descriptions-price-label">
                    MINIMUM ORDER QUANTITY
                  </div>
                  <div className="product-descriptions-price">
                    {product.minimumOrderQuantity}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Divider />

          <div className="descriptions">
            <span className="bold">DESCRIPTION</span>
            <div className="descriptions-details">{product.description}</div>
          </div>

          <Divider />

          <div className="descriptions dimension-wrapper">
            <span className="bold">DIMENSION</span>
            <div className="descriptions-details dimension">
              Product dimensions:
              <span className="dimension-value">
                H{product.dimensions.height} * W{product.dimensions.width} * D
                {product.dimensions.depth}cm
              </span>
            </div>
            <div className="descriptions-details dimension">
              Product Weight:
              <span className="dimension-value">{product.weight}g</span>
            </div>
          </div>

          <Divider />

          <div className="descriptions dimension-wrapper">
            <span className="bold">PRODUCT POLICY</span>
            <div className="descriptions-details dimension">
              Return Policy:
              <span className="dimension-value">{product.returnPolicy}</span>
            </div>
            <div className="descriptions-details dimension">
              Warranty Policy:
              <span className="dimension-value">
                {product.warrantyInformation}
              </span>
            </div>
          </div>
          <Divider />

          <div className="descriptions">
            <span className="bold">REVIEWS</span>

            {product.reviews.map((review) => {
              return <ReviewSection review={review} />;
            })}
          </div>

          <Divider />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
