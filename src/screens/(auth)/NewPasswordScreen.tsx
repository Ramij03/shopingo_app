import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types'; 
import { useNavigation } from '@react-navigation/native';
import 'firebase/auth';
import { getAuth, updatePassword } from 'firebase/auth';

type ForgetPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const ResetPassword: React.FC = () => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Login'>>();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');


  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
  };

  const handleSubmit = async () => {
    try {
      // Regular expression for a strong password: at least 8 characters long, contains an uppercase letter, a lowercase letter, a number, and a special character
      const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
      if (!strongPasswordRegex.test(password)) {
        throw new Error('Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.');
      }
  
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
  
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        await updatePassword(user, password);
        console.log('Password updated successfully');
        navigation.navigate('Login');
      } else {
        throw new Error('User is not signed in');
      }
    } catch (error) {
      setError(`Error: Updating Password`);
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.containertext}>
        <Text style={styles.title}>Reset password</Text>
        <Text style={styles.subtitle}>Create your new password here</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Password</Text>
        <TextInput
          style={styles.formInput}
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Confirm Password</Text>
        <TextInput
          style={styles.formInput}
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          secureTextEntry
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save change</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  containertext: {
    padding: 20,
    marginTop: -200,
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 30,
    color: '#383B46',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#888990',
    marginBottom: 30,
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 20,
  },
  formLabel: {
    fontFamily: 'SourceSansPro-Semibold',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#383B46',
    marginBottom: 10,
  },
  formInput: {
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#6c757d',
    backgroundColor: '#F7F8F9',
  },
  button: {
    backgroundColor: '#dc3545',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default ResetPassword;
