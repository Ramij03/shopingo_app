import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Dimensions,View, Text, TouchableOpacity, Image,PixelRatio } from 'react-native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import colors from '../../constants/colors';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

//import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

type RootStackParamList = {
    Home: undefined;
    SignUp: undefined;
    Login: undefined;
    Welcome:undefined
  };

// Define the type for the navigation prop in HomeScreen
type HomeScreenProps = NativeStackScreenProps<RootStackParamList,  'Home'| 'Welcome' >;

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeScreen({ navigation }: HomeScreenProps): React.JSX.Element {

useEffect(()=> {
  GoogleSignin.configure({
    webClientId: '443430946629-5gv8njpfcjr5e1suqhcnsnc86dccddjq.apps.googleusercontent.com',
  });
},[]);

async function onGoogleButtonPress() {
  try {
    // Sign out any existing Google sign-in session
    await GoogleSignin.signOut();

    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Get the user's ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    await auth().signInWithCredential(googleCredential);
    

    // Navigate to the Welcome screen
    navigation.navigate('Welcome');
  } catch (error) {
    console.error(error);
  }
}
/*
async function onFacebookButtonPress() {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccessToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(facebookCredential);
  navigation.navigate('Welcome');
}
*/
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>
          <Text style={{ color: 'black' }}>shopin</Text>
          <Text style={{ color: '#E0464E' }}>go</Text>
        </Text>
      </View>

      <Text style={styles.description}>
        Find latest and greatest clothes for your daily fashion
      </Text>

      <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signUpButtonText}>Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or</Text>

      <View style={styles.socialButtonsContainer}>
        <View style={styles.circlecontainer}>
        <TouchableOpacity>
          <Image source={require('../../assets/logos/facebook1.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        </View>
        <View style={styles.circlecontainer}>
        <TouchableOpacity onPress={()=>onGoogleButtonPress()}>
          <Image source={require('../../assets/logos/Google.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        </View>
        <View style={styles.circlecontainer}>
        <TouchableOpacity >
          <Image source={require('../../assets/logos/apple.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, // Static padding
  },
  logoContainer: {
    marginBottom: 40, // Static margin from bottom
  },
  logoText: {
    fontSize: PixelRatio.get() * 12, // Responsive font size (8% of screen width)
    fontWeight: 'bold',
  },
  description: {
    fontSize: PixelRatio.get() * 5.5, // Responsive font size (4% of screen width)
    textAlign: 'center',
    color: colors.darkgrey,
    marginBottom: 30, // Static margin from bottom
  },
  signUpButton: {
    width: '90%', // Percentage-based width
    height: 60, // Fixed height
    backgroundColor: colors.primary,
    paddingVertical: 15, // Static padding vertical
    paddingHorizontal: 20, // Static padding horizontal
    borderRadius: 10, // Static border radius
    marginBottom: 20, // Static margin from bottom
  },
  signUpButtonText: {
    color: colors.white,
    fontSize: PixelRatio.get() * 5, // Responsive font size (4% of screen width)
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    width: '90%', // Percentage-based width
    height: 60, // Fixed height
    paddingVertical: 15, // Static padding vertical
    paddingHorizontal: 20, // Static padding horizontal
    borderRadius: 10, // Static border radius
    marginBottom: 20, // Static margin from bottom
  },
  loginButtonText: {
    color: colors.primary,
    fontSize: PixelRatio.get() * 5, // Responsive font size (4% of screen width)
    fontWeight: 'bold',
    textAlign: 'center',
  },
  orText: {
    color: colors.grey,
    fontSize: PixelRatio.get() * 5, // Responsive font size (4% of screen width)
    marginBottom: 20, // Static margin from bottom
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%', // Percentage-based width
    height: 50, // Fixed height
  },
  circlecontainer: {
    width: '15%', // Percentage-based width
    height: 10, // Responsive height (15% of screen width)
    borderRadius: 10, // Responsive border radius (7.5% of screen width)
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    width: 40, // Responsive width (10% of screen width)
    height: 40, // Responsive height (10% of screen width)
  },
});


  export default HomeScreen;