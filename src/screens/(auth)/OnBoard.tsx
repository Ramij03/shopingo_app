import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Animated, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import OnBoardItem from '../components/OnBoardItem'; 
import slides from '../store/slides'; 
import colors from '../../constants/colors';

const { width, height } = Dimensions.get('window');

type RootStackParamList = {
  OnBoard: undefined;
  Home: undefined;
};

type OnBoardingProps = NativeStackScreenProps<RootStackParamList, 'OnBoard'>;

const OnBoard: React.FC<OnBoardingProps> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

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

  const renderItem = ({ item }: { item: any }) => (
    <OnBoardItem item={item} />
  );

  const dotScale = scrollX.interpolate({
    inputRange: slides.map((_, index) => index * width),
    outputRange: slides.map((_, index) => (currentIndex === index ? 1.5 : 1)),
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewRef}
        viewabilityConfig={viewConfigRef}
        scrollEventThrottle={32}
        ref={flatListRef}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />
        
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <Pressable key={index} onPress={() => handleDotPress(index)}>
              <Animated.View
                style={[
                  styles.dot,
                  {
                    transform: [{ scale: dotScale }],
                    opacity: scrollX.interpolate({
                      inputRange: [
                        (index - 1) * width,
                        index * width,
                        (index + 1) * width,
                      ],
                      outputRange: [0.3, 1, 0.3],
                      extrapolate: 'clamp',
                    }),
                  },
                ]}
              />
            </Pressable>
          ))}
        </View>
        
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>→</Text>
        </TouchableOpacity>
   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: height * 0.05,
  },
  dot: {
    width: width * 0.02,
    height: width * 0.02,
    borderRadius: width * 0.01,
    backgroundColor: colors.primary,
    marginHorizontal: width * 0.02,
  },
  button: {
    backgroundColor: colors.primary,
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: width * 0.05,
    justifyContent: 'center',
    marginBottom: height * 0.05,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.09,
    textAlign: 'center',
  },
});

export default OnBoard;
