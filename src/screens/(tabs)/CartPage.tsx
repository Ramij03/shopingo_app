import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions
} from 'react-native';
import { CartContext } from '../../screens/components/CartContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetail'>;
  
interface Product {
  id: string;
  imageURL: string;
  Title: string;
  Price: number;
}

const CartPage = () => {
  const context = useContext(CartContext);

  if (!context) {
    console.error('CartContext is not available');
    return null;
  }

  const { cartItems, removeFromCart } = context;

  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  const totalPrice = cartItems.reduce((acc, item) => acc + item.Price, 0);
  const discount = 5;
  const finalPrice = totalPrice - discount;

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}>
      <Image source={{ uri: item.imageURL }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.Title}</Text>
        <Text style={styles.rating}>4.0 ★★★★★</Text>
        <Text style={styles.price}>${item.Price.toFixed(2)}</Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity>
          <Text style={styles.controlButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>01</Text>
        <TouchableOpacity>
          <Text style={styles.controlButton}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.checkbox}>
        <Text style={styles.checkboxText}>✓</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Product List</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />

      <View style={styles.promoContainer}>
        <TextInput style={styles.promoInput} placeholder="Promo code" />
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyText}>Apply</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Items ({cartItems.length})</Text>
        <Text style={styles.summaryPrice}>${totalPrice.toFixed(2)}</Text>
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Discount</Text>
        <Text style={styles.summaryDiscount}>$5</Text>
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Shipping</Text>
        <Text style={styles.summaryShipping}>Free</Text>
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Price</Text>
        <Text style={styles.totalPrice}>${finalPrice.toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.proceedButton}>
        <Text style={styles.proceedText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: screenWidth * 0.04, // Responsive padding
    marginBottom: screenHeight * 0.1, // Responsive margin
  },
  header: {
    fontSize: screenWidth * 0.06, // Responsive font size
    fontWeight: 'bold',
    color: 'black',
    marginVertical: screenHeight * 0.02, // Responsive margin
    textAlign: 'center',
  },
  list: {
    flexGrow: 1,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginVertical: screenHeight * 0.01, // Responsive margin
    padding: screenWidth * 0.03, // Responsive padding
    borderRadius: screenWidth * 0.02, // Responsive border radius
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  image: {
    width: screenWidth * 0.15, // Responsive width
    height: screenWidth * 0.15, // Responsive height
    borderRadius: screenWidth * 0.02, // Responsive border radius
  },
  details: {
    flex: 1,
    paddingHorizontal: screenWidth * 0.03, // Responsive padding
  },
  title: {
    fontSize: screenWidth * 0.04, // Responsive font size
    fontWeight: 'bold',
    color: '#333',
  },
  rating: {
    fontSize: screenWidth * 0.035, // Responsive font size
    color: 'orange',
    marginVertical: screenHeight * 0.01, // Responsive margin
  },
  price: {
    fontSize: screenWidth * 0.04, // Responsive font size
    fontWeight: 'bold',
    color: '#333',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: screenWidth * 0.03, // Responsive margin
  },
  controlButton: {
    fontSize: screenWidth * 0.05, // Responsive font size
    paddingHorizontal: screenWidth * 0.02, // Responsive padding
    color: '#333',
  },
  quantity: {
    fontSize: screenWidth * 0.04, // Responsive font size
    fontWeight: 'bold',
    marginHorizontal: screenWidth * 0.02, // Responsive margin
  },
  checkbox: {
    width: screenWidth * 0.06, // Responsive width
    height: screenWidth * 0.06, // Responsive height
    backgroundColor: '#E0464E',
    borderRadius: screenWidth * 0.03, // Responsive border radius
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxText: {
    fontSize: screenWidth * 0.04, // Responsive font size
    color: '#FFF',
    textAlign: 'center',
  },
  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: screenHeight * 0.02, // Responsive margin
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: screenWidth * 0.02, // Responsive border radius
    padding: screenWidth * 0.03, // Responsive padding
  },
  applyButton: {
    backgroundColor: '#E0464E',
    borderRadius: screenWidth * 0.02, // Responsive border radius
    padding: screenWidth * 0.03, // Responsive padding
    marginLeft: screenWidth * 0.02, // Responsive margin
  },
  applyText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: screenWidth * 0.04, // Responsive font size
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: screenHeight * 0.01, // Responsive padding
  },
  summaryText: {
    fontSize: screenWidth * 0.04, // Responsive font size
    color: '#333',
  },
  summaryPrice: {
    fontSize: screenWidth * 0.04, // Responsive font size
    color: '#333',
  },
  summaryDiscount: {
    fontSize: screenWidth * 0.04, // Responsive font size
    color: '#E0464E',
  },
  summaryShipping: {
    fontSize: screenWidth * 0.04, // Responsive font size
    color: '#00A000',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: screenHeight * 0.02, // Responsive padding
    borderTopWidth: 1,
    borderColor: '#DDD',
  },
  totalLabel: {
    fontSize: screenWidth * 0.05, // Responsive font size
    fontWeight: 'bold',
    color: '#333',
  },
  totalPrice: {
    fontSize: screenWidth * 0.05, // Responsive font size
    fontWeight: 'bold',
    color: '#E0464E',
  },
  proceedButton: {
    backgroundColor: '#E0464E',
    borderRadius: screenWidth * 0.02, // Responsive border radius
    padding: screenWidth * 0.04, // Responsive padding
  },
  proceedText: {
    color: '#FFF',
    fontSize: screenWidth * 0.05, // Responsive font size
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CartPage;
