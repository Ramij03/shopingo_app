import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import functions from '@react-native-firebase/functions';
import colors from '../../constants/colors';

type ForgetPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Verify'>;
interface SendVerificationEmailResult {
  data: {
    success: boolean;
    error?: string;
  };
}
const ForgetPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigation = useNavigation<ForgetPasswordScreenNavigationProp>(); 

  const validateEmail = (text: string) => {
    setEmail(text);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|outlook|yahoo|icloud|hotmail|)\.com$/;
    if (!emailRegex.test(text)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const isFormValid = () => {
    return email && !emailError;
  };

  const handleResetPassword = async () => {
    if (isFormValid()) {
      try {
        const methods = await auth().fetchSignInMethodsForEmail(email);
        if (methods.length === 0) {
          setEmailError('No account found with this email address.');
        } else {
          const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
          await sendVerificationEmail(email, verificationCode);
          navigation.navigate('Verify', { verificationCode });
        }
      } catch (firebaseError) {
        console.error("Firebase error: ", firebaseError);
        setEmailError('An error occurred. Please try again later.');
      }
    } else {
      setEmailError('Please enter a valid email address.');
    }
  };

  const sendVerificationEmail = async (email: string, code: string) => {
    const sendEmail = firebase.functions().httpsCallable('sendVerificationEmail');
    try {
      const result = await sendEmail({ email, code });
      const data = (result as SendVerificationEmailResult).data;
      if (data.success) {
        console.log('Email sent successfully');
      } else {
        console.log('Failed to send email:', data.error);
      }
    } catch (error) {
      console.error('Error calling sendVerificationEmail function:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containertext}>
        <Text style={styles.title}>Forgot password</Text>
        <Text style={styles.subtitle}>Enter your email address and we will send you reset instructions.</Text>
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
      
      <TouchableOpacity 
        style={[styles.button, !isFormValid() && { backgroundColor: '#bbb' }]}
        onPress={handleResetPassword}
        disabled={!isFormValid()}
      >
        <Text style={styles.buttonText}>Reset password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: colors.shadewhite,
  },
  containertext: {
    padding: 20,
    marginTop: -200,
    justifyContent: 'center',
    backgroundColor: colors.shadewhite,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.darkgrey,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors.lightgrey,
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: colors.lightgrey,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
    width: 343,
    height: 56,
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 5,
    margin: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
  },
  formContainer: {
    marginBottom: 20,
  },
  formLabel: {
    fontFamily: 'SourceSansPro-Semibold',
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkgrey,
    marginBottom: 10,
  },
  formInput: {
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
    color: colors.grey,
    backgroundColor: colors.darkwhite,
  },
  errorText: {
    color: colors.primary,
    marginBottom: 20,
  },
});

export default ForgetPasswordScreen;
