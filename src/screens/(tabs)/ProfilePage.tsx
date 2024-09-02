import React from 'react';
import { Text, StyleSheet, View,TouchableOpacity,Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';
import colors from '../../constants/colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const ProfilePage = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      
      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
    textAlign:'center'
  },
  logoutButton: {
    backgroundColor: colors.primary,
    borderRadius: screenWidth * 0.02,
    padding: screenWidth * 0.04,
  },
  logoutText: {
    color: colors.white,
    fontSize: screenWidth * 0.05,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProfilePage