import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Dimensions,PixelRatio } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types'; 
import auth from '@react-native-firebase/auth';
import colors from '../../constants/colors';

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
        setEmail('');
        setPassword('');
      } catch (firebaseError: any) {
        if (firebaseError instanceof Error) {
          setError('Incorrect Email or Password');
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
    padding: 20, // Static padding
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  containertext: {
    padding: 20, // Static padding
    marginTop: -100, // Static margin from top
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  welcomeText: {
    fontFamily: 'SourceSansPro-Semibold',
    fontWeight: 'bold',
    fontSize: PixelRatio.get() * 9, // Responsive font size (8% of screen width)
    color: colors.darkgrey,
    marginBottom: 20, // Static margin from bottom
    textAlign: 'center',
  },
  subtitleText: {
    fontFamily: 'Source Sans Pro',
    fontWeight: 'semibold',
    fontSize: PixelRatio.get() * 5, // Responsive font size (4% of screen width)
    color: colors.lightgrey,
    marginBottom: 30, // Static margin from bottom
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 20, // Static margin from bottom
   
  },
  formLabel: {
    fontFamily: 'SourceSansPro-Semibold',
    fontSize: PixelRatio.get() * 5, // Responsive font size (4% of screen width)
    fontWeight: 'bold',
    color: colors.darkgrey,
    marginBottom: 10, // Static margin from bottom
  },
  formInput: {
    height: 50, // Fixed height
    paddingHorizontal: 15, // Static padding horizontal
    fontSize: PixelRatio.get() * 5, // Responsive font size (4% of screen width)
    color: colors.grey,
    backgroundColor: colors.darkwhite,
    borderRadius:6
  },
  signInButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15, // Static padding vertical
    borderRadius: 10, // Static border radius
    alignItems: 'center',
  },
  signInText: {
    color: colors.white,
    fontSize: PixelRatio.get() * 6, // Responsive font size (5% of screen width)
  },
  forgotPassword: {
    color: colors.black,
    textAlign: 'center',
    marginTop: 20, // Static margin from top
    marginBottom: 30, // Static margin from bottom
    fontSize: PixelRatio.get() * 4.5,
  },
  newAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40, // Static margin from top
  },
  createAccountText: {
    color: colors.primary,
    fontSize: PixelRatio.get() * 4.5,
  },
  errorText: {
    color: colors.primary,
    marginBottom: 20, // Static margin from bottom
    fontSize: PixelRatio.get() * 4.5,
  },
});



export default SignInScreen;
