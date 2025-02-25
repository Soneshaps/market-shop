// src/api/dummyapi.ts

import { ProductsResponse, Product } from "../types/types";

const BASE_URL = "https://dummyjson.com/products";
const LIMIT = 20;

export const getAllProducts = async (
  page: number
): Promise<ProductsResponse> => {
  const skip = (page - 1) * LIMIT;
  const response = await fetch(`${BASE_URL}?limit=${LIMIT}&skip=${skip}`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return await response.json();
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product details");
  }
  return await response.json();
};
