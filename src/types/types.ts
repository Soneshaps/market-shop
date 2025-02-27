export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  minimumOrderQuantity: number;
  availabilityStatus: string;
  returnPolicy: string;
  tags: string[];
  weight: number;
  warrantyInformation: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  reviews: {
    comment: string;
    date: string;
    rating: number;
    reviewerEmail: string;
    reviewerName: string;
  }[];
}

export interface ProductsResponse {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}
