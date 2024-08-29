import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, FlatList, Dimensions, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const { width, height } = Dimensions.get('window');

// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
type RootStackParamList = {
  OnBoardingScreen: undefined;
  Home: undefined;
};

type OnBoardingProps = NativeStackScreenProps<RootStackParamList, 'OnBoardingScreen'>;

const slides = [
  {
    id: '1',
    image: require('../../assets/images/onboard1.jpg'),
    title: 'Discover the latest largest & collections!',
    description: 'Explore the largest collections of clothes designed by our exclusive designers!',
    note:"30 new arrival 🔥"
  },
  {
    id: '2',
    image: require('../../assets/images/onboard2.jpg'),
    title: 'Shop your favorites!',
    description: 'Find and shop your favorite items with ease and convenience!',
    note:"Designer collection ✌"
  },
  {
    id: '3',
    image: require('../../assets/images/onboard3.jpg'),
    title: 'Fast Delivery at your Doorstep!',
    description: 'Experience quick and reliable delivery to your doorstep!',
    note:"Fast delivery 🚚"
  },
];

const OnBoardingScreen: React.FC<OnBoardingProps> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate('Home');
    }
  };

  const handleDotPress = (index: number) => {
    flatListRef.current?.scrollToIndex({ index });
  };

  const renderItem = ({ item }: any) => (
    <ImageBackground source={item.image} style={styles.imageBackground}>
      

      <View style={styles.labelContainer}>
      <View style={styles.overlay}>
      <Text style={styles.labelText}>{item.note}</Text>
      </View>  
      </View>

      <View style={styles.textContainer}>
        <View style={styles.titlecontainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        </View>
        
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <Pressable
              key={index}
              onPress={() => handleDotPress(index)}
              style={[
                styles.dot,
                { opacity: currentIndex === index ? 1 : 0.3 },
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>→</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );

  return (
    <FlatList
      data={slides}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onViewableItemsChanged={onViewRef.current}
      viewabilityConfig={viewConfigRef.current}
      ref={flatListRef}
    />
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  imageBackground: {
    width: screenWidth, // Full screen width
    height: screenHeight * 0.65, // Responsive height (45% of screen height)
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: screenHeight * 0.2, // Responsive top position (20% from the top)
    left: 0,
    right: 0,
    width: screenWidth * 0.4, // Responsive width (40% of screen width)
    height: screenHeight * 0.07, // Responsive height (7% of screen height)
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: screenWidth * 0.02, // Responsive border radius (2% of screen width)
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContainer: {
    paddingHorizontal: screenWidth * 0.04, // Responsive horizontal padding
    paddingVertical: screenHeight * 0.02, // Responsive vertical padding
    borderRadius: screenWidth * 0.02, // Responsive border radius
    marginTop: screenHeight * 0.1, // Responsive margin from top
    alignSelf: 'flex-start',
    marginLeft: screenWidth * 0.05, // Responsive margin from left
  },
  labelText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: screenWidth * 0.04, // Responsive font size
  },
  textContainer: {
    width: '100%',
    height: screenHeight * 0.45, // Responsive height (40% of screen height)
    backgroundColor: '#fff',
    borderTopLeftRadius: screenWidth * 0.1, // Responsive border radius (10% of screen width)
    borderTopRightRadius: screenWidth * 0.1, // Responsive border radius (10% of screen width)
    padding: screenWidth * 0.05, // Responsive padding
    marginTop: screenHeight * 0.45, // Responsive margin from top
    alignItems: 'center',
  },
  titlecontainer: {
    width: screenWidth * 0.9, // Responsive width (90% of screen width)
    height: screenHeight * 0.22, // Responsive height (30% of screen height)
    backgroundColor: '#fff',
    padding: screenWidth * 0.05, // Responsive padding
  },
  title: {
    fontSize: screenWidth * 0.06, // Responsive font size
    color: '#000',
    fontWeight: 'bold',
    marginBottom: screenHeight * 0.03, // Responsive margin from bottom
    textAlign: 'center',
  },
  description: {
    fontSize: screenWidth * 0.04, // Responsive font size
    textAlign: 'center',
    color: '#74767E',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom:screenHeight * 0.04,
    },
  dot: {
    width: screenWidth * 0.02, // Responsive width
    height: screenWidth * 0.011, // Responsive height
    borderRadius: screenWidth * 0.01, // Responsive border radius
    backgroundColor: '#E0464E',
    marginHorizontal: screenWidth * 0.02, // Responsive horizontal margin
  },
  button: {
    width: screenWidth * 0.15, // Responsive width (15% of screen width)
    height: screenWidth * 0.15, // Responsive height (15% of screen width)
    backgroundColor: '#E0464E',
    justifyContent: 'center',
    borderRadius: screenWidth * 0.03, // Responsive border radius (3% of screen width)
    alignItems: 'center',
    paddingBottom: screenHeight * 0.015, // Responsive padding bottom
   
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: screenWidth * 0.07, // Responsive font size
    textAlign: 'center',
  },
});
