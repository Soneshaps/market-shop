import { Rating } from "@mui/material";
import { formatDate } from "../utils/utils";

interface ReviewSectionProps {
  review: {
    comment: string;
    date: string;
    rating: number;
    reviewerEmail: string;
    reviewerName: string;
  };
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ review }) => {
  return (
    <div>
      <div className="review-section">
        <div className="rating-image">
          <img
            src="https://creativemarket.com/images/1/default-avatars-mar/silhouette-75-75.png"
            alt="user"
          />
        </div>
        <div className="rating-details">
          <span className="rating-profile-detail">
            {review.reviewerName}
            <span className="rating-date">{formatDate(review.date)}</span>
          </span>
          <Rating
            name="read-only"
            size="small"
            value={review.rating}
            readOnly
          />
        </div>
      </div>
      <div className="rating-descriptions">{review.comment}</div>
    </div>
  );
};

export default ReviewSection;
