import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';
import auth from '@react-native-firebase/auth';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Verify'>;

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState('');

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
    const passwordRegex = /^(?=.*[A-Z])(?=.*\W).{8,}$/;
    if (!passwordRegex.test(text)) {
      setPasswordError('Password must be at least 8 characters long, contain one uppercase letter, and one special character');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    if (text !== password) {
      setError('Passwords do not match');
    } else {
      setError('');
    }
  };

  const isFormValid = () => {
    return name && email && password && confirmPassword && !emailError && !passwordError && !error;
  };

  const handleSubmit = async () => {
    if (isFormValid()) {
      try {
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
  
        if (user) {
          await user.updateProfile({
            displayName: name,
          });
          navigation.navigate('Welcome');
        }
      } catch (firebaseError: any) {
        // Check if the error is an instance of Error
        if (firebaseError instanceof Error) {
          setError(firebaseError.message);
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      }
    } else {
      setError('Please fill in all fields correctly');
    }
  };
  

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Create an account</Text>
        <Text style={styles.subtitle}>Create an account to access your products</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Full Name</Text>
        <TextInput
          style={styles.formInput}
          value={name}
          onChangeText={(text) => setName(text)}
        />
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

      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Confirm Password</Text>
        <TextInput
          style={styles.formInput}
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          secureTextEntry
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <TouchableOpacity
        style={[styles.button, !isFormValid() && { backgroundColor: '#bbb' }]}
        onPress={handleSubmit}
        disabled={!isFormValid()}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: screenWidth * 0.07, // Responsive font size (7% of screen width)
    fontWeight: 'bold',
    marginBottom: screenHeight * 0.02, // Responsive margin (2% of screen height)
    color: '#383B46',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: screenWidth * 0.04, // Responsive font size (4% of screen width)
    color: '#888990',
    marginBottom: screenHeight * 0.04, // Responsive margin (4% of screen height)
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: screenHeight * 0.03, // Responsive margin (3% of screen height)
    
  },
  formLabel: {
    fontFamily: 'SourceSansPro-Semibold',
    fontSize: screenWidth * 0.04, // Responsive font size (4% of screen width)
    fontWeight: 'bold',
    color: '#383B46',
    marginBottom: screenHeight * 0.02, // Responsive margin (2% of screen height)
  },
  formInput: {
    height: screenHeight * 0.07, // Responsive height (7% of screen height)
    paddingHorizontal: screenWidth * 0.03, // Responsive padding (3% of screen width)
    fontSize: screenWidth * 0.04, // Responsive font size (4% of screen width)
    color: '#6c757d',
    backgroundColor: '#F7F8F9',
  },
  button: {
    backgroundColor: '#dc3545',
    paddingVertical: screenHeight * 0.02, // Responsive padding (2% of screen height)
    borderRadius: screenWidth * 0.02, // Responsive border radius (2% of screen width)
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: screenWidth * 0.05, // Responsive font size (5% of screen width)
  },
  errorText: {
    color: 'red',
    marginBottom: screenHeight * 0.02, // Responsive margin (2% of screen height)
  },
});


export default SignUpScreen;
