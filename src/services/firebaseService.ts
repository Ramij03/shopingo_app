import { db } from '../../firebase.config';
import { getDocs, collection, doc, getDoc, query, where } from 'firebase/firestore';

interface Product {
  id: string;
  ImageURL: string;
  Title: string;
  Price: string;
  Description?: string;  
  Materials?: string;
  Fittings?: string;
  Type?: string; // Assuming products have a type to find similar items
}

export const fetchProducts = async (): Promise<Product[]> => {
  const products: Product[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      products.push({
        id: doc.id,
        ImageURL: data.ImageURL || '',
        Title: data.Title || 'No Name',
        Price: data.Price || '0',
        Description: data.Description || '',
        Materials: data.Materials || '',
        Fittings: data.Fittings || '',
        Type: data.Type || '',
      });
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
  return products;
};

export const fetchProductById = async (productId: string): Promise<Product | null> => {
  try {
    const docRef = doc(db, 'products', productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ImageURL: data.ImageURL || '',
        Title: data.Title || 'No Name',
        Price: data.Price || '0',
        Description: data.Description || '',
        Materials: data.Materials || '',
        Fittings: data.Fittings || '',
        Type: data.Type || '',
      } as Product;
    } else {
      console.error('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }
};

export const fetchSimilarProducts = async (productId: string): Promise<Product[]> => {
  try {
    const product = await fetchProductById(productId);
    if (!product || !product.Type) {
      return [];
    }

    const similarProductsQuery = query(
      collection(db, 'products'),
      where('Type', '==', product.Type),
      where('__name__', '!=', productId)  // Exclude the current product
    );

    const querySnapshot = await getDocs(similarProductsQuery);
    const similarProducts: Product[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      similarProducts.push({
        id: doc.id,
        ImageURL: data.ImageURL || '',
        Title: data.Title || 'No Name',
        Price: data.Price || '0',
        Description: data.Description || '',
        Materials: data.Materials || '',
        Fittings: data.Fittings || '',
        Type: data.Type || '',
      });
    });

    return similarProducts;
  } catch (error) {
    console.error('Error fetching similar products:', error);
    return [];
  }
};
