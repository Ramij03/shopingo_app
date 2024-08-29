import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types'; 

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BottomTabs'>;

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>
          <Text style={{ color: 'black' }}>shopin</Text>
          <Text style={{ color: '#E0464E' }}>go</Text>
        </Text>
      </View>
      <View style={styles.containertext}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>Find the latest and greatest clothes for your daily fashion</Text>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BottomTabs')}>
        <Text style={styles.buttonText}>Start exploring</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: screenWidth * 0.05, // Responsive padding (5% of screen width)
    backgroundColor: '#FFF',
  },
  containertext: {
    marginTop: screenHeight * 0.2, // Responsive margin (20% of screen height)
  },
  title: {
    fontSize: screenWidth * 0.08, // Responsive font size (8% of screen width)
    fontWeight: 'bold',
    marginBottom: screenHeight * 0.02, // Responsive margin (2% of screen height)
    color: '#383B46',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: screenWidth * 0.05, // Responsive font size (5% of screen width)
    color: '#888990',
    textAlign: 'center',
    marginBottom: screenHeight * 0.04, // Responsive margin (4% of screen height)
  },
  button: {
    width: screenWidth * 0.9, // Responsive width (90% of screen width)
    height: screenHeight * 0.07, // Responsive height (7% of screen height)
    backgroundColor: '#E0464E',
    paddingVertical: screenHeight * 0.02, // Responsive padding (2% of screen height)
    paddingHorizontal: screenWidth * 0.1, // Responsive padding (10% of screen width)
    borderRadius: screenWidth * 0.015, // Responsive border radius (1.5% of screen width)
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: screenHeight * 0.38, // Responsive margin (30% of screen height)
  },
  buttonText: {
    color: '#FFF',
    fontSize: screenWidth * 0.05, // Responsive font size (5% of screen width)
    textAlign: 'center',
  },
  logoContainer: {
    marginTop: screenHeight * 0.03, // Responsive margin (3% of screen height)
  },
  logoText: {
    fontSize: screenWidth * 0.08, // Responsive font size (8% of screen width)
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
