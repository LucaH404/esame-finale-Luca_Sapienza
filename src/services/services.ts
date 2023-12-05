import axios from "axios";
const apiUrl = "https://dummyjson.com/products";

export const fetchAllProducts = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    const response = await axios.get(apiUrl, {
      params: {
        limit: limit,
        skip: skip,
      },
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);

    if (response.status === 200) {
      const product = response.data;
      return product;
    } else {
      throw new Error(
        `Failed to fetch product. Status code: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const getContactById = async (id: string) => {
    try {
        const response= await axios.get(`https://dummyjson.com/users/${id}`);

    if (response.status === 200) {
        const contact = response.data;
        return contact;
      } else {
        throw new Error(
          `Failed to fetch product. Status code: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
};

export const getProductByCategory = async (
  category: string,
  page = 1,
  limit = 10
) => {
  try {
    const skip = (page - 1) * limit;
    const response = await axios.get(`${apiUrl}/category/${category}`, {
      params: {
        limit: limit,
        skip: skip,
      },
    });
    if (response.status === 200) {
      const products = response.data;
      return products;
    } else {
      throw new Error(
        `Failed to fetch products. Status code: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const searchProducts = async (query: string) => {
    try {
      const response = await axios.get(`${apiUrl}/search`, {
        params: {
          q: query,
        },
      });
  
      if (response.status === 200) {
        const products = response.data;
        return products;
      } else {
        throw new Error(
          `Failed to fetch products. Status code: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };