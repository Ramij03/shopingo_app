import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types'; 
import auth from '@react-native-firebase/auth';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ForgetPassword' | 'SignUp'>;

const SignInScreen: React.FC = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (text: string) => {
    setEmail(text);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|outlook|yahoo|icloud|hotmail)\.com$/;
    if (!emailRegex.test(text)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (text: string) => {
    setPassword(text);
    if (text.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
    } else {
      setPasswordError('');
    }
  };

  const isFormValid = () => {
    return email && password && !emailError && !passwordError;
  };

  const handleSignIn = async () => {
    if (isFormValid()) {
      try {
        await auth().signInWithEmailAndPassword(email, password);
        navigation.navigate('Welcome');
      } catch (firebaseError: any) {
        if (firebaseError instanceof Error) {
          setError(firebaseError.message);
        } else {
          // Provide a fallback error message if the error is not of type `Error`
          setError('An unexpected error occurred. Please try again.');
        }
      }
    } else {
      setError('Please fill in all fields correctly');
    }
  };  
  
  return (
    <View style={styles.container}>
      <View style={styles.containertext}>
        <Text style={styles.welcomeText}>Welcome back!</Text>
        <Text style={styles.subtitleText}>Log in with your existing account to access your products</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Email</Text>
        <TextInput
          style={styles.formInput}
          value={email}
          onChangeText={validateEmail}
          keyboardType="email-address"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Password</Text>
        <TextInput
          style={styles.formInput}
          value={password}
          onChangeText={validatePassword}
          secureTextEntry
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
        <Text style={styles.forgotPassword}>Forget password?</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={handleSignIn} 
        style={[styles.signInButton, !isFormValid() && { backgroundColor: '#bbb' }]}
        disabled={!isFormValid()}
      >
        <Text style={styles.signInText}>Sign in</Text>
      </TouchableOpacity>

      <View style={styles.newAccountContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.createAccountText}>Create new account.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: screenWidth * 0.05, // Responsive padding (5% of screen width)
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  containertext: {
    padding: screenWidth * 0.05, // Responsive padding (5% of screen width)
    marginTop: -screenHeight * 0.2, // Responsive margin from top (-20% of screen height)
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  welcomeText: {
    fontFamily: 'SourceSansPro-Semibold',
    fontWeight: 'bold',
    fontSize: screenWidth * 0.08, // Responsive font size (8% of screen width)
    color: '#383B46',
    marginBottom: screenHeight * 0.02, // Responsive margin from bottom (2% of screen height)
    textAlign: 'center',
  },
  subtitleText: {
    fontFamily: 'Source Sans Pro',
    fontWeight: 'semibold',
    fontSize: screenWidth * 0.04, // Responsive font size (4% of screen width)
    color: '#888990',
    marginBottom: screenHeight * 0.04, // Responsive margin from bottom (4% of screen height)
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: screenHeight * 0.03, // Responsive margin from bottom (3% of screen height)
  },
  formLabel: {
    fontFamily: 'SourceSansPro-Semibold',
    fontSize: screenWidth * 0.04, // Responsive font size (4% of screen width)
    fontWeight: 'bold',
    color: '#383B46',
    marginBottom: screenHeight * 0.02, // Responsive margin from bottom (2% of screen height)
  },
  formInput: {
    height: screenHeight * 0.07, // Responsive height (7% of screen height)
    paddingHorizontal: screenWidth * 0.03, // Responsive padding horizontal (3% of screen width)
    fontSize: screenWidth * 0.04, // Responsive font size (4% of screen width)
    color: '#6c757d',
    backgroundColor: '#F7F8F9',
  },
  signInButton: {
    backgroundColor: '#dc3545',
    paddingVertical: screenHeight * 0.02, // Responsive padding vertical (2% of screen height)
    borderRadius: screenWidth * 0.02, // Responsive border radius (2% of screen width)
    alignItems: 'center',
  },
  signInText: {
    color: '#FFF',
    fontSize: screenWidth * 0.05, // Responsive font size (5% of screen width)
  },
  forgotPassword: {
    color: '#010F07',
    textAlign: 'center',
    marginTop: screenHeight * 0.03, // Responsive margin from top (3% of screen height)
    marginBottom: screenHeight * 0.04, // Responsive margin from bottom (4% of screen height)
  },
  newAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: screenHeight * 0.05, // Responsive margin from top (5% of screen height)
  },
  createAccountText: {
    color: '#E0464E',
  },
  errorText: {
    color: 'red',
    marginBottom: screenHeight * 0.03, // Responsive margin from bottom (3% of screen height)
  },
});


export default SignInScreen;
