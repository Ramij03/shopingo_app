import React, { useState, useEffect } from 'react';
import { Text, Image, StyleSheet, View, TouchableOpacity ,Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface ProductCardProps {
  imageURL: string;
  Title: string;
  Price: string;
  OriginalPrice?: string;
  onPress: () => void;
  onToggleFavorite: (isFavorite: boolean) => void;
  isFavorite: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageURL,
  Title,
  Price,
  OriginalPrice,
  onPress,
  onToggleFavorite,
  isFavorite,
}) => {
  const [favorite, setFavorite] = useState(isFavorite);

  useEffect(() => {
    // Sync the local state with the prop `isFavorite`
    setFavorite(isFavorite);
  }, [isFavorite]);

  const handleFavoritePress = () => {
    const newFavoriteState = !favorite;
    setFavorite(newFavoriteState);
    onToggleFavorite(newFavoriteState);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: imageURL }} style={styles.image} />
      <TouchableOpacity onPress={handleFavoritePress} style={styles.heartIconContainer}>
        <Image
          source={require('../../assets/icons/Love1.png')} // Update path as needed
          style={[
            styles.heartIcon,
            { tintColor: favorite ? '#FF6464' : '#CCCCCC' },
          ]}
        />
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {Title}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${Price}</Text>
          {OriginalPrice && (
            <Text style={styles.originalPrice}>${OriginalPrice}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: screenWidth * 0.48, // Responsive width (roughly half the screen width minus margins)
    height: screenHeight * 0.4, // Responsive height
    borderRadius: screenWidth * 0.02, // Responsive border radius
    backgroundColor: '#FFFFFF',
    marginHorizontal: screenWidth * 0.02, // Responsive margin
    overflow: 'hidden',
    shadowColor: '#efefef',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: screenWidth * 0.02, // Responsive shadow radius
    elevation: 5,
  },
  image: {
    width: '100%',
    height: screenHeight * 0.25, // Responsive height
  },
  infoContainer: {
    padding: screenWidth * 0.03, // Responsive padding
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: screenWidth * 0.04, // Responsive font size
    fontWeight: '600',
    color: '#131212',
    marginBottom: screenHeight * 0.01, // Responsive margin
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: screenWidth * 0.045, // Responsive font size
    fontWeight: '700',
    color: 'black',
  },
  originalPrice: {
    fontSize: screenWidth * 0.04, // Responsive font size
    fontWeight: '600',
    color: 'gray',
    textDecorationLine: 'line-through',
    marginLeft: screenWidth * 0.02, // Responsive margin
  },
  heartIconContainer: {
    position: 'absolute',
    top: screenHeight * 0.02, // Responsive top position
    right: screenWidth * 0.02, // Responsive right position
    zIndex: 1,
  },
  heartIcon: {
    width: screenWidth * 0.06, // Responsive icon size
    height: screenWidth * 0.06, // Responsive icon size
  },
});


export default ProductCard;
