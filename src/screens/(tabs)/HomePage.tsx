
  import React, { useEffect, useState } from 'react';
  import { Dimensions,Text, FlatList, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
  import { fetchProducts } from '../../services/apiService';  
  import { useNavigation } from '@react-navigation/native';
  import { StackNavigationProp } from '@react-navigation/stack';
  import { RootStackParamList } from '../../../types';
  import ProductCard from '../components/ProductCard';
import { SafeAreaView } from 'react-native-safe-area-context';
  
  interface Product {
    id: string;
    ImageURL: string;
    Title: string;
    Price: string;
  }
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetail'>;
  
  const HomePage: React.FC = () => {
    
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<WelcomeScreenNavigationProp>();
  
    useEffect(() => {
      const loadData = async () => {
        try {
          const allProducts = await fetchProducts();
          setProducts(allProducts);
        } catch (error) {
          console.error('Error fetching products:', error);
        } finally {
          setLoading(false);
        }
      };
  
      loadData();
    }, []);
  
    const renderProductCard = ({ item }: { item: Product }) => (
      <ProductCard
        imageURL={item.ImageURL}
        Title={item.Title}
        Price={item.Price}
        onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
        onToggleFavorite={(isFavorite) => {
          // Handle the favorite toggle logic here
        }}
        isFavorite={false} // Set the initial favorite state as needed
      />
    );
  
    const stories = [
        { id: '1', imageURL: 'https://s3-alpha-sig.figma.com/img/acf8/f745/4d31209c7f43663bfe0a73d581056c59?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ddzg9up~H~sguWl7h5zPHeshga2rv2OreShAftjLYn4imivhVQieabXKe7SdzP1nzkgEFrwW06mGB6Y-OWcNHii4O7Urr-yvOoVVUWa9fZZferTkiPyjo4wAlfZ-3eZyMo0Yl-j7XSBA4BblLy1pA2fLgY-TdxnFnYGrag42pPAFj0pgrrzfnw8y4nN9TP~eLPhrdo6OB1AkXaj-4E4bSQMk-DAmTBJlIgzJYsofKuAbyQKYtlf4qG69vlYQG1GMecFipA1Zj6j2b2jUwdOUDT48XxFcHHIngVc9r2EPHPyp~ulNRTLWXherP~exMSfj590De6Qd1IM9Zsf0PXjCCA__', title: '40% sales' },
        { id: '2', imageURL: 'https://s3-alpha-sig.figma.com/img/4443/ddbb/44c2426ed2f3b2b4d88234cb3e41f8b6?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SfBejTPHqGeQWN7cHWX-vpw3jIwkDEdrpZ3XfMMscwnDhqSppKTjA3PD7MvjPeYs0QrWyrBVMLcU8YXw5CuTk5wGWKv3j834-yOk-ne9l64TiXBWQXNucrwHltrzLM3Gh-t0Y4y-yh0ViGk2h24OFtew5TcEG27XnSz4CDKdMyXH3oB6xQ~QSS56BPLR~aO51JfULss9NvJsMxML5WRjTeoYruODV-UbHUGIv18FGA9yP5OsT4rNgPnHyCb2Qp6lxpHOaxC5n5eKWp6iNU9EFxDvEoOfu1oZahrchAh8Bbd-c3rSvnggm0cfJ2jlY-p9YJ60F3brqrVD7p03qltGwQ__', title: 'New Arrival' },
        { id: '3', imageURL: 'https://s3-alpha-sig.figma.com/img/b194/6c5e/977258328bf0fa2e9ede1098916e0afe?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Vz08~x-qEyapJ4NM4d0VZrgoKybG1Cyc4ab0UHEP40Dann0N~F51qQp2n84JlG7EaYlhb2VyXmBcWl5izVcuRAch11ni-i1bxBDfjF9Y-OnkVfmeWToh6FCezRUijN2-zh1BqUo0G7mJmuJGMotCsP65BS4oVT3IdkwbgMQrTKx2ZglSr2KMgweraEDxJSZAvDqcnb3AsiXsYRiWM67tvw6AfcqX-nyZMw2frH4jcQOToJmjoJv-psiw65sm~jdmVoaTAdTfU9--Gy0IcFY9X2E9uAY688ixq5AMsQcbnzaqtROCN6yJAV2YfsJeHl0ZHaScKpijVuCrhTtvgtXnuQ__', title: '33% sales' },
        { id: '4', imageURL: 'https://s3-alpha-sig.figma.com/img/aa5b/7bcd/8d4805fa0c1fd354b16bb41c2cf82f7d?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CJ8puvHuWgY0a6r-eLJxO0wJ8YkUehLbnwZJ0x3sI3kg4mEC46LVBo3fXVtn8yL-4ScymirQhsYKyd0kUKmYkjGBrT4tWkn6RBtvyeAG6uXMt8GRzw5YPog4N47qPxeoxbnXdkxj4QBq3ycx7ZBqZOdLqvUMmEQ0kOBNVEkedEBm0p2pjb~aF9Q~G2W9lKmc0ogGq~TCzU36vs7EzxyntONCCVh1~71Yt4YX-OG4HAeCHydL8lPXbbf1oft3CLshC7~vPycRLuRylTULv9O2w4nVpZAeHrCcPfr6xY-pW1mI7ED1bHITZe2tHjnpwTDWUqEXeZNs-CRaty8K4UEQkQ__', title: 'Fall sale' },
      
    ];
  
    const handlePressStory = (storyId: string) => {
      navigation.navigate('StoryView', { storyId });
    };
  
    const renderStories = () => (
      <View style={styles.storiesContainer}>
        <Text style={styles.storytext}>Stories</Text>
        <FlatList
          horizontal
          data={stories}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePressStory(item.id)} style={styles.storyItem}>
              <Text style={styles.storyText}>{item.title}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  
    const renderSectionHeader = (title: string) => (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity><Text style={styles.seeAllText}>See all</Text></TouchableOpacity>
      </View>
    );
  
    return (
      <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity>
                <Image source={require('../../assets/icons/Scan.png')} style={styles.icon} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Explore</Text>
              <TouchableOpacity>
                <Image source={require('../../assets/icons/Notification.png')} style={styles.icon} />
              </TouchableOpacity>
            </View>
  
            {/* Stories */}
            {renderStories()}
  
            {/* New Arrival and Special Discount Section */}
            <View style={styles.specialDiscountContainer}>
              <Text style={styles.specialDiscountText}>New arrival and special discount!</Text>
              <TouchableOpacity style={styles.shopNowButton}>
                <Text style={styles.shopNowButtonText}>All Offers</Text>
              </TouchableOpacity>
              <View style={styles.dotContainer}>
                {products.length > 0 && products.slice(0, 3).map((_, index) => (
                  <View 
                    key={index} 
                    style={[
                      styles.dot, 
                      index === 1 ? styles.activeDot : styles.inactiveDot
                    ]} 
                  />
                ))}
              </View>
            </View>
  
            {/* Categories Button Row */}
            <FlatList
              horizontal
              data={['Best Selling', 'For Women', 'For Men']} // Replace with actual category data if needed
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.categoryButton}>
                  <Text style={styles.categoryText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => `category-${index}`}
              showsHorizontalScrollIndicator={false}
              ListHeaderComponent={() => (
                <TouchableOpacity style={styles.categoryButton1}>
                  <Image
                    source={require('../../assets/icons/AllCategory.png')} // Replace with the correct path to your image
                    style={styles.categoryIcon}
                  />
                </TouchableOpacity>
              )}
            />
  
            {/* Section: Popular Products */}
            {renderSectionHeader('Popular products')}
            <FlatList
              horizontal
              data={products.slice(0, 2)}
              renderItem={renderProductCard}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
            />
  
            {/* Section: New Arrival */}
            {renderSectionHeader('New arrival')}
            <FlatList
              horizontal
              data={products.slice(2, 4)}
              renderItem={renderProductCard}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
            />
  
            {/* Section: Explore */}
            {renderSectionHeader('Explore')}
          </>
        }
        data={products.slice(0,8).concat(products.slice(14,18))  }
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id}
        numColumns={2} 
        columnWrapperStyle={styles.row}
      />
      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      marginBottom: 40,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 16,
    },
    headerTitle: {
      fontSize: screenWidth * 0.05, // Responsive font size
      fontWeight: '600',
      color: '#010F07',
    },
    icon: {
      width: screenWidth * 0.06, // Responsive icon size
      height: screenWidth * 0.06,
    },
    storiesContainer: {
      paddingLeft: 16,
      marginVertical: 8,
    },
    storyItem: {
      width: screenWidth * 0.25, // Responsive width
      height: screenHeight * 0.15, // Responsive height
      flexDirection: 'column-reverse',
      backgroundColor: '#e0e0e0',
      borderRadius: 8,
      paddingVertical: 4,
      paddingHorizontal: 16,
      marginRight: 10,
      alignItems: 'center',
    },
    storytext: {
      fontSize: screenWidth * 0.04, // Responsive font size
      color: 'black',
      fontWeight: '700',
      marginBottom: 10,
    },
    storyText: {
      fontSize: screenWidth * 0.03, // Responsive font size
      color: '#FFFFFF',
      fontWeight: '600',
      marginBottom: 5,
    },
    specialDiscountContainer: {
      width: screenWidth * 0.93, // Responsive width
      height: screenHeight * 0.25, // Responsive height
      backgroundColor: '#f0e1f3',
      borderRadius: 12,
      padding: 16,
      marginHorizontal: 16,
      marginBottom: 16,
      position: 'relative',
    },
    specialDiscountText: {
      fontSize: screenWidth * 0.06, // Responsive font size
      color: '#FFFFFF',
      fontWeight: '600',
      marginBottom: 8,
      marginTop: 16,
    },
    shopNowButton: {
      backgroundColor: '#E0464E',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 4,
      alignSelf: 'flex-start',
    },
    shopNowButtonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: screenWidth * 0.04, // Responsive font size
    },
    categoriesRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 16,
      marginBottom: 16,
    },
    categoryButton: {
      width: screenWidth * 0.3, // Responsive width
      height:screenWidth * 0.146,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#e0e0e0',
      borderRadius: 8,
      marginHorizontal: 8,
      padding: 8,
    },
    categoryButton1: {
      width: screenWidth * 0.15, // Responsive width
      height: screenHeight * 0.07, // Responsive height
      marginRight: 4,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#E0464E',
      borderRadius: 10,
      justifyContent: 'center',
      marginHorizontal: 8,
    },
    categoryIcon: {
      tintColor: '#FFFFFF',
      width: screenWidth * 0.06, // Responsive icon size
      height: screenWidth * 0.06,
    },
    categoryText: {
      fontSize: screenWidth * 0.035, // Responsive font size
      fontWeight: '600',
      color: '#74767E',
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 16,
      marginVertical: 8,
    },
    sectionTitle: {
      fontSize: screenWidth * 0.05, // Responsive font size
      fontWeight: 'bold',
      color: '#000000',
    },
    seeAllText: {
      marginTop: 10,
      fontSize: screenWidth * 0.03, // Responsive font size
      fontWeight: '600',
      color: '#888990',
    },
    productsContainer: {
      paddingLeft: 16,
      marginBottom: 16,
    },
    dotContainer: {
      position: 'absolute',
      right: 10,
      top: '50%',
    },
    dot: {
      width: screenWidth * 0.02, // Responsive dot size
      height: screenWidth * 0.02,
      borderRadius: screenWidth * 0.01, // Responsive dot radius
      marginBottom: 8,
    },
    activeDot: {
      backgroundColor: '#E0464E',
    },
    inactiveDot: {
      backgroundColor: '#B0B0B0',
    },
    row: {
      marginVertical: 10,
    },
    verticalProductCard: {
      width: screenWidth * 0.6, // Responsive width
      marginBottom: 16,
    },
  });

export default HomePage;


