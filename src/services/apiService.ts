import axios from 'axios';

 interface Product {
  id: string;
  ImageURL: string;
  Title: string;
  Price: string;
  Description?: string;
  Type?: string;
  Materials?: string;
  Fittings?: string;
}



export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data.map((product: any) => ({
      id: product.id.toString(),
      ImageURL: product.image,
      Title: product.title,
      Price: product.price.toString(),
    }));
  } catch (error) {
    console.error('Error fetching products from API:', error);
    return [];
  }
};

export const fetchProductById = async (productId: string): Promise<Product | null> => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
    return {
      id: response.data.id.toString(),
      ImageURL: response.data.image,
      Title: response.data.title,
      Price: response.data.price.toString(),
      Description: response.data.description, 
      Type: response.data.category,
      Materials: '', 
      Fittings: '' 
    };
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }
};

export const fetchSimilarProducts = async (productId: string): Promise<Product[]> => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    const productCategory = response.data.find((product: any) => product.id === parseInt(productId, 10))?.category;
    if (!productCategory) return [];

    return response.data
      .filter((product: any) => product.category === productCategory && product.id !== parseInt(productId, 10))
      .map((product: any) => ({
        id: product.id.toString(),
        ImageURL: product.image,
        Title: product.title,
        Price: product.price.toString(),
      }));
  } catch (error) {
    console.error('Error fetching similar products:', error);
    return [];
  }
};
