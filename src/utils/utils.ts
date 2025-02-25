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
