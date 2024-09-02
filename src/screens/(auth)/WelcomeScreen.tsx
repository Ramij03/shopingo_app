import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions,PixelRatio} from 'react-native';
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
    padding: 20, // Static padding
    backgroundColor: '#FFF',
  },
  containertext: {
    marginTop: 100, // Static margin from top
  },
  title: {
    fontSize: PixelRatio.get() * 9, // Responsive font size (8% of screen width)
    fontWeight: 'bold',
    marginBottom: 20, // Static margin from bottom
    color: '#383B46',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: PixelRatio.get() * 6, // Responsive font size (5% of screen width)
    color: '#888990',
    textAlign: 'center',
    marginBottom: 50, // Static margin from bottom
  },
  button: {
    width: '90%', // Percentage width for responsiveness
    height: 55, // Fixed height
    backgroundColor: '#E0464E',
    paddingVertical: 10, // Static padding vertical
    paddingHorizontal: 15, // Static padding horizontal
    borderRadius: 10, // Static border radius
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 350, // Static margin from top
  },
  buttonText: {
    color: '#FFF',
    fontSize: PixelRatio.get() * 6, // Responsive font size (5% of screen width)
    textAlign: 'center',
  },
  logoContainer: {
    marginTop: 30, // Static margin from top
  },
  logoText: {
    fontSize: PixelRatio.get() * 12, // Responsive font size (8% of screen width)
    fontWeight: 'bold',
  },
});


export default WelcomeScreen;
