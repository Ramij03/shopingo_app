import React, { useState } from 'react';
import { Text, FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import ProductCard from '../components/ProductCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';
import colors from '../../constants/colors';
import Product from '../../services/apiService';

type FavoriteScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FavoritePage'>;

const FavoritePage: React.FC = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const navigation = useNavigation<FavoriteScreenNavigationProp>();

  // Handler to remove a product from favorites
  const handleRemoveFavorite = (productId: string) => {
    setFavoriteProducts((prevFavorites) =>
      prevFavorites.filter((product) => product.id !== productId)
    );
  };

  const renderProductCard = ({ item }: { item: Product }) => (
    <ProductCard
      imageURL={item.ImageURL}
      Title={item.Title}
      Price={(item.Price).toString()}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
      onToggleFavorite={(isFavorite) => {
        if (isFavorite) {
          handleRemoveFavorite(item.id);
        } else {
          
        }
      }}
      isFavorite={true}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorite Items</Text>
      </View>
      {favoriteProducts.length > 0 ? (
        <FlatList
          data={favoriteProducts}
          renderItem={renderProductCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorite products found.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
    textAlign:'center'
  },
  row: {
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: colors.grey,
  },
});

export default FavoritePage;
