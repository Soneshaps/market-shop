import { Status } from "../components/ProductList";
import { Product } from "../types/types";

export const getUniqueCategories = (products: Product[]): string[] => {
  return [...new Set(products.map((product) => product.category))];
};

export const filterProductsByCategory = (
  products: Product[],
  category: string
) => {
  if (category === "All") {
    return products;
  }

  return products.filter((product) => product.category === category);
};

export const getAvailablilityClassName = (status: string) => {
  if (status === Status.IN_STOCK) {
    return "green";
  }

  if (status === Status.OUT_OF_STOCK) {
    return "red";
  }

  if (status === Status.LOW_STOCK) {
    return "orange";
  }
};

export function discountedPrice(discountPercentage: number, price: number) {
  return Math.floor(price - (discountPercentage / 100) * price);
}
