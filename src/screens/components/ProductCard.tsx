import React, { useState, useEffect } from 'react';
import { Text, Image, StyleSheet, View, TouchableOpacity ,Dimensions,PixelRatio } from 'react-native';
import colors from '../../constants/colors';

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
            { tintColor: favorite ? colors.primary : colors.grey },
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
  container:{
    marginHorizontal: screenWidth * 0.04,
  },
  card: {
    width: screenWidth * 0.48, // Responsive width (roughly half the screen width minus margins)
    height: 350, 
    borderRadius: 10,
    backgroundColor: colors.white,
    marginHorizontal: 6, 
    marginVertical: 6, 
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  
  },
  image: {
    width: '100%',
    height: 250, 
  },
  infoContainer: {
    padding: 10, 
    backgroundColor: colors.white,
  },
  title: {
    fontSize:PixelRatio.get() * 5, 
    fontWeight: '600',
    color: colors.black,
    marginBottom: 5, 
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: PixelRatio.get() * 6, // Responsive font size
    fontWeight: '700',
    color: 'black',
  },
  originalPrice: {
    fontSize: PixelRatio.get() * 4, // Responsive font size
    fontWeight: '600',
    color: colors.grey,
    textDecorationLine: 'line-through',
    marginLeft: 10, 
  },
  heartIconContainer: {
    position: 'absolute',
    top: screenHeight * 0.02, // Responsive top position
    right: screenWidth * 0.02, // Responsive right position
    zIndex: 1,
  },
  heartIcon: {
    width: 25, 
    height: 25, 
  },
});


export default ProductCard;
