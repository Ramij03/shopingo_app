import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../types';
import colors from '../../constants/colors';

type VerifyScreenNavigationProp = StackNavigationProp<RootStackParamList, 'NewPasswordScreen'>;
type VerifyScreenRouteProp = RouteProp<RootStackParamList, 'Verify'>;

const VerifyScreen: React.FC = () => {
  const navigation = useNavigation<VerifyScreenNavigationProp>();
  const route = useRoute<VerifyScreenRouteProp>();
  const { verificationCode } = route.params; // Accessing the verification code from route params
  const [inputCode, setInputCode] = useState('');

  const handleVerifyCode = () => {
    if (inputCode === verificationCode) {
      navigation.navigate('NewPasswordScreen'); // Navigate to ResetPassword screen if codes match
    } else {
      Alert.alert('Invalid verification code.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Verification Code</Text>
      <TextInput
        style={styles.input}
        value={inputCode}
        onChangeText={setInputCode}
        keyboardType="number-pad"
        placeholder="Enter the code"
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: colors.darkgrey,
  },
  input: {
    height: 50,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
    color: colors.darkgrey,
  },
  button: {
    backgroundColor: colors.green,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
  },
});

export default VerifyScreen;
