import React, { useEffect, useState } from 'react';
import { Text, Dimensions, ScrollView, StyleSheet, View, Image, TouchableOpacity,PixelRatio, Linking } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { fetchProductById, fetchSimilarProducts } from '../../services/apiService';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../screens/store/cartSlice'; // Import your addToCart action
import Snackbar from 'react-native-snackbar';
import colors from '../../constants/colors';


// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
type ProductDetailNavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetail'>;
type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

interface Product {
  id: string;
  ImageURL: string;
  Title: string;
  Price: number;
  Review?: string;
  Description?: string;
  Type?: string;
  Materials?: string;
  Fittings?: string;
}

const ProductDetail: React.FC = () => {
  const route = useRoute<ProductDetailRouteProp>();
  const navigation = useNavigation<ProductDetailNavigationProp>();
  const { productId } = route.params ;

  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const dispatch = useDispatch(); // Initialize the Redux dispatch

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
      dispatch(addToCart({
        id: product.id,
        ImageURL: product.ImageURL,
        Title: product.Title,
        Price: product.Price,
      }));

      Snackbar.show({
        text: `Added to cart`,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#E0464E',
      });
    }
  };

  const color = [colors.white, colors.orange, colors.purple, colors.grey];
  const sizes = ['5', '6', '7', '8'];

  return (
    <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.backIconContainer}
        onPress={() => navigation.navigate('BottomTabs')}
        >
          <Image source={require('../../assets/icons/Back.png')} style={styles.Icon}/>
        </TouchableOpacity>
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
              {color.map((color, index) => (
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
      <TouchableOpacity onPress={()=> {Linking.openURL("https://fakestoreapi.com/docs")}}>
        <Text style={styles.productLink}>Visit Fake Store API for more details</Text>
        </TouchableOpacity>
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
    backgroundColor: colors.shadewhite,
  },
  backIconContainer: {
    position: 'absolute',
    top: screenHeight * 0.02, // Responsive top position
    left: screenWidth * 0.03, // Responsive right position
    zIndex: 1,
  },
  Icon: {
    width: 25, 
    height: 25, 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%', // Percentage width
    height: 300, // Fixed height to maintain layout
    resizeMode: 'contain',
  },
  detailsContainer: {
    padding: 16, // Static padding for consistency
  },
  productTitle: {
    fontSize: PixelRatio.get() * 6, // Responsive font size
    fontWeight: 'bold',
    color: colors.black,
  },
  productPrice: {
    fontSize: PixelRatio.get() * 7, // Responsive font size
    fontWeight: '600',
    color: colors.primary,
    marginVertical: 10, // Static margin for consistency
  },
  productReview: {
    fontSize: PixelRatio.get() * 6, // Responsive font size
    color: colors.grey,
    marginVertical: 10, // Static margin for consistency
  },
  sectionTitle: {
    fontSize: PixelRatio.get() * 6, // Responsive font size
    fontWeight: 'bold',
    marginVertical: 12, // Static margin for consistency
    color: colors.black,
  },
  productDescription: {
    fontSize: PixelRatio.get() * 5, // Responsive font size
    fontWeight: '400',
    color: colors.grey,
    marginVertical: 14, // Static margin for consistency
  },
  OptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15, // Static margin for consistency
    marginRight:8,
  },
  optionsContainer: {
    flexDirection: 'row',
    
  },
  colorOption: {
    width: '10%', // Percentage width
    height: 30, // Fixed height for consistent layout
    borderRadius: 20, // Fixed border radius
    borderWidth: 2, // Fixed border width
    borderColor: colors.lightgrey,
    marginHorizontal: 8, // Static margin for consistency
  },
  sizeOption: {
    width: '12%', // Percentage width
    height: 35, // Fixed height for consistent layout
    borderRadius: 20, // Fixed border radius
    borderWidth: 2, // Fixed border width
    borderColor: colors.lightgrey,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: PixelRatio.get() * 6, // Responsive font size
    color: colors.black,
  },
  selectedOptionC: {
    borderColor: colors.orange,
    borderWidth: 3, // Fixed border width
  },
  selectedOptionS: {
    color: colors.primary,
    borderColor: colors.orange,
    borderWidth: 3, // Fixed border width
  },
  similarProductsContainer: {
    paddingTop: 10, // Static padding for consistency
  },
  productCard: {
    width: '32%', // Percentage width
    height: 300, // Fixed height for consistent layout
    backgroundColor: colors.white,
    margin:4,
    padding: 10, // Static padding for consistency
    borderRadius: 10, // Fixed border radius
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5, // Fixed shadow offset
    },
    shadowOpacity: 0.25,
    shadowRadius: 10, // Fixed shadow radius
    elevation: 5,
  },
  productImageSmall: {
    width: '100%',
    height: '75%',
    resizeMode: 'contain',
  },
  productTitleSmall: {
    fontSize: PixelRatio.get() * 4, // Responsive font size
    fontWeight: 'bold',
    marginVertical: 8, // Static margin for consistency
  },
  productPriceSmall: {
    fontSize: PixelRatio.get() * 5, // Responsive font size
    color: colors.primary,
    fontWeight: '600',
   
  },
  addtocartcontainer: {
    padding: 15, // Static padding for consistency
  },
  addToCartButton: {
    backgroundColor: colors.primary,
    paddingVertical: 18, // Fixed height for buttons
    borderRadius: 10, // Fixed border radius
    alignItems: 'center',
  },
  addToCartButtonText: {
    fontSize: PixelRatio.get() * 6, // Responsive font size
    fontWeight: 'bold',
    color: colors.white,
  },
  productLink: {
    fontSize: PixelRatio.get() * 5, // Responsive font size
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: colors.primary,
    textAlign:'center'
  },
});


export default ProductDetail;
