import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../screens/store/Store';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput, Dimensions,PixelRatio } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../../screens/store/cartSlice';
import { RootStackParamList } from '../../../types';
import colors from '../../constants/colors';
import { CartItem } from '../../screens/store/cartSlice';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetail'>;


const CartPage: React.FC = () => {
  const cartItems: CartItem[] = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.Price * item.quantity, 0);

  const finalPrice = totalPrice ;

  const renderItem = ({ item }: { item: CartItem }) => (
    
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <Image source={{ uri: item.ImageURL }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.Title}</Text>
        <Text style={styles.rating}>4.0 ★★★★★</Text>
        <Text style={styles.price}>${(item.Price * item.quantity).toFixed(2)}</Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => dispatch(decreaseQuantity(item.id))}>
          <Text style={styles.controlButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity.toString().padStart(2, '0')}</Text>
        <TouchableOpacity onPress={() => dispatch(increaseQuantity(item.id))}>
          <Text style={styles.controlButton}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))} style={styles.checkbox}>
        <Text style={styles.checkboxText}>✓</Text>
      </TouchableOpacity>
    </TouchableOpacity>
    
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Product List</Text>
      <FlatList<CartItem>
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
    backgroundColor: colors.shadewhite,
    paddingHorizontal: screenWidth * 0.04,
    marginBottom: 80,
  },
  header: {
    fontSize: PixelRatio.get() * 7, 
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 20,
    textAlign: 'center',
  },
  list: {
    flexGrow: 1,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginVertical:10,
    padding: 10,
    borderRadius: 10,
    shadowColor: colors.halfblack,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  image: {
    width: '30%',
    height: 130,
    borderRadius: 10,
  },
  details: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: PixelRatio.get() * 4,// Title font size * 7
    fontWeight: 'bold',
    color: colors.darkgrey,
  },
  rating: {
    fontSize: PixelRatio.get() * 4,// Other text font size * 5
    color: colors.orange,
    marginVertical: 10,
  },
  price: {
    fontSize: PixelRatio.get() * 5, // Title font size * 7
    fontWeight: 'bold',
    color: colors.darkgrey,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  controlButton: {
    fontSize: PixelRatio.get() * 6, // Other text font size * 5
    paddingHorizontal: screenWidth * 0.02,
    color: colors.darkgrey,
  },
  quantity: {
    fontSize: PixelRatio.get() * 5, // Title font size * 7
    fontWeight: 'bold',
    marginHorizontal: screenWidth * 0.02,
  },
  checkbox: {
    width: '6%',
    height: 25,
    backgroundColor: colors.primary,
    borderRadius: screenWidth * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxText: {
    fontSize: PixelRatio.get() * 5, // Other text font size * 5
    color: colors.white,
    textAlign: 'center',
  },
  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 10,
    padding: 15,
  },
  applyButton: {
    height:60,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 15, // Fixed height for button
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  applyText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: PixelRatio.get() * 5, // Other text font size * 5

  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  summaryText: {
    fontSize: PixelRatio.get() * 5, // Other text font size * 5
    color: colors.darkgrey,
  },
  summaryPrice: {
    fontSize: PixelRatio.get() * 5, // Other text font size * 5
    color: colors.darkgrey,
  },
  summaryShipping: {
    fontSize: PixelRatio.get() * 5, // Other text font size * 5
    color: colors.green,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical:  10,
    borderTopWidth: 1,
    borderColor: colors.grey,
  },
  totalLabel: {
    fontSize: PixelRatio.get() * 6, // Title font size * 7
    fontWeight: 'bold',
    color: colors.darkgrey,
  },
  totalPrice: {
    fontSize: PixelRatio.get() * 6, // Title font size * 7
    fontWeight: 'bold',
    color: colors.primary,
  },
  proceedButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 20, // Fixed height for button
    paddingHorizontal: 40
  },
  proceedText: {
    color: colors.white,
    fontSize: PixelRatio.get() * 6, // Title font size * 7
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


export default CartPage;
