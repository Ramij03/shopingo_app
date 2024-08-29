import React, { useEffect, useState, useContext } from 'react';
import { Text,Dimensions, ScrollView, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { fetchProductById, fetchSimilarProducts } from '../../services/apiService';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';
import { CartContext } from '../../screens/components/CartContext';
import Snackbar from 'react-native-snackbar';


// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
type ProductDetailNavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetail'>;
type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

interface Product {
  id: string;
  ImageURL: string;
  Title: string;
  Price: string;
  Review?: string;
  Description?: string;
  Type?: string;
  Materials?: string;
  Fittings?: string;
}

const ProductDetail: React.FC = () => {
  const route = useRoute<ProductDetailRouteProp>();
  const navigation = useNavigation<ProductDetailNavigationProp>();
  const { productId } = route.params;

  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const context = useContext(CartContext);

  if (!context) {
    console.error('CartContext is not available');
    return null;
  }

  const { addToCart } = context;

  useEffect(() => {
    const loadProductData = async () => {
      try {
        const fetchedProduct = await fetchProductById(productId);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          const similar = await fetchSimilarProducts(productId);
          setSimilarProducts(similar);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    loadProductData();
  }, [productId]);

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        imageURL: product.ImageURL,
        Title: product.Title,
        Price: parseFloat(product.Price),
      });

      // Show snackbar message
      Snackbar.show({
        text: `Added to cart`,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor:'#E0464E'
      });
    }
  };

  const colors = ['#FFFFFF', '#8A8EF9', '#24BC61', '#7B7881'];
  const sizes = ['5', '6', '7', '8'];

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.ImageURL }} style={styles.productImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.productTitle}>{product.Title}</Text>
        <Text style={styles.productPrice}>${product.Price}</Text>
        {product.Review && <Text style={styles.productReview}>{product.Review}</Text>}
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.productDescription}>{product.Description}</Text>

        <View style={styles.OptionsContainer}>
          <View>
            <Text style={styles.sectionTitle}>Colors</Text>
            <View style={styles.optionsContainer}>
              {colors.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    selectedColor === color && styles.selectedOptionC,
                  ]}
                  onPress={() => setSelectedColor(color)}
                />
              ))}
            </View>
          </View>

          <View>
            <Text style={styles.sectionTitle}>Sizes</Text>
            <View style={styles.optionsContainer}>
              {sizes.map((size, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.sizeOption,
                    selectedSize === size && styles.selectedOptionS,
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text style={styles.sizeText}>{size}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Type</Text>
          <Text style={styles.productDescription}>{product.Type}</Text>
          <Text style={styles.sectionTitle}>Materials</Text>
          <Text style={styles.productDescription}>{product.Materials}</Text>
          <Text style={styles.sectionTitle}>Fittings</Text>
          <Text style={styles.productDescription}>{product.Fittings}</Text>
        </View>

        <Text style={styles.sectionTitle}>Similar Products</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.similarProductsContainer}>
          {similarProducts.map((similarProduct) => (
            <TouchableOpacity
              key={similarProduct.id}
              style={styles.productCard}
              onPress={() => navigation.navigate('ProductDetail', { productId: similarProduct.id })}
            >
              <Image source={{ uri: similarProduct.ImageURL }} style={styles.productImageSmall} />
              <Text style={styles.productTitleSmall}>{similarProduct.Title}</Text>
              <Text style={styles.productPriceSmall}>${similarProduct.Price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.addtocartcontainer}>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: screenWidth,
    height: screenHeight * 0.4, // Responsive height
    resizeMode: 'contain',
  },
  detailsContainer: {
    padding: screenWidth * 0.04, // Responsive padding
  },
  productTitle: {
    fontSize: screenWidth * 0.06, // Responsive font size
    fontWeight: 'bold',
    color: '#000000',
  },
  productPrice: {
    fontSize: screenWidth * 0.05, // Responsive font size
    fontWeight: '600',
    color: '#E0464E',
    marginVertical: screenHeight * 0.01, // Responsive margin
  },
  productReview: {
    fontSize: screenWidth * 0.04, // Responsive font size
    color: '#888',
    marginVertical: screenHeight * 0.01, // Responsive margin
  },
  sectionTitle: {
    fontSize: screenWidth * 0.05, // Responsive font size
    fontWeight: 'bold',
    marginVertical: screenHeight * 0.015, // Responsive margin
    color: '#000000',
  },
  productDescription: {
    fontSize: screenWidth * 0.04, // Responsive font size
    fontWeight: '400',
    color: '#555',
    marginVertical: screenHeight * 0.02, // Responsive margin
  },
  OptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: screenHeight * 0.02, // Responsive margin
  },
  optionsContainer: {
    flexDirection: 'row',
  },
  colorOption: {
    width: screenWidth * 0.07, // Responsive width
    height: screenWidth * 0.07, // Responsive height
    borderRadius: screenWidth * 0.035, // Responsive border radius
    borderWidth: screenWidth * 0.015, // Responsive border width
    borderColor: '#ddd',
    marginHorizontal: screenWidth * 0.02, // Responsive margin
  },
  sizeOption: {
    width: screenWidth * 0.08, // Responsive width
    height: screenWidth * 0.08, // Responsive height
    borderRadius: screenWidth * 0.04, // Responsive border radius
    borderWidth: screenWidth * 0.015, // Responsive border width
    borderColor: '#ddd',
    marginHorizontal: screenWidth * 0.02, // Responsive margin
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: screenWidth * 0.04, // Responsive font size
    color: '#000000',
  },
  selectedOptionC: {
    borderColor: '#FF9922',
    borderWidth: screenWidth * 0.02, // Responsive border width
  },
  selectedOptionS: {
    color: '#E0464E',
    borderColor: '#E0464E',
    borderWidth: screenWidth * 0.015, // Responsive border width
  },
  similarProductsContainer: {
    marginVertical: screenHeight * 0.02, // Responsive margin
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: screenWidth * 0.02, // Responsive border radius
    padding: screenWidth * 0.03, // Responsive padding
    marginRight: screenWidth * 0.02, // Responsive margin
    width: screenWidth * 0.3, // Responsive width
    elevation: 2,
  },
  productImageSmall: {
    width: '100%',
    height: screenHeight * 0.1, // Responsive height
    borderRadius: screenWidth * 0.02, // Responsive border radius
    marginBottom: screenHeight * 0.01, // Responsive margin
  },
  productTitleSmall: {
    fontSize: screenWidth * 0.04, // Responsive font size
    fontWeight: '600',
    marginBottom: screenHeight * 0.01, // Responsive margin
  },
  productPriceSmall: {
    fontSize: screenWidth * 0.04, // Responsive font size
    color: '#E0464E',
  },
  addtocartcontainer: {
    margin: screenWidth * 0.02, // Responsive margin
  },
  addToCartButton: {
    backgroundColor: '#E0464E',
    padding: screenWidth * 0.04, // Responsive padding
    borderRadius: screenWidth * 0.02, // Responsive border radius
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: '#FFFFFF',
    fontSize: screenWidth * 0.04, // Responsive font size
    fontWeight: 'bold',
  },
});

export default ProductDetail;
