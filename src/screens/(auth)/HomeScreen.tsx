import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Dimensions,View, Text, TouchableOpacity, Image } from 'react-native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';


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
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: screenWidth * 0.05, // Responsive padding (5% of screen width)
  },
  logoContainer: {
    marginBottom: screenHeight * 0.1, // Responsive margin from bottom (10% of screen height)
  },
  logoText: {
    fontSize: screenWidth * 0.08, // Responsive font size (8% of screen width)
    fontWeight: 'bold',
  },
  description: {
    fontSize: screenWidth * 0.04, // Responsive font size (4% of screen width)
    textAlign: 'center',
    color: '#383B46',
    marginBottom: screenHeight * 0.05, // Responsive margin from bottom (5% of screen height)
  },
  signUpButton: {
    width: screenWidth * 0.9, // Responsive width (90% of screen width)
    height: screenHeight * 0.08, // Responsive height (8% of screen height)
    backgroundColor: '#E0464E',
    paddingVertical: screenHeight * 0.025, // Responsive padding vertical (2% of screen height)
    paddingHorizontal: screenWidth * 0.1, // Responsive padding horizontal (10% of screen width)
    borderRadius: screenWidth * 0.02, // Responsive border radius (2% of screen width)
    marginBottom: screenHeight * 0.02, // Responsive margin from bottom (2% of screen height)
  },
  signUpButtonText: {
    color: 'white',
    fontSize: screenWidth * 0.04, // Responsive font size (4% of screen width)
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginButton: {
    borderWidth: 1,
    borderColor: '#E0464E',
    width: screenWidth * 0.9, // Responsive width (90% of screen width)
    height: screenHeight * 0.08, // Responsive height (8% of screen height)
    paddingVertical: screenHeight * 0.025, // Responsive padding vertical (2% of screen height)
    paddingHorizontal: screenWidth * 0.1, // Responsive padding horizontal (10% of screen width)
    borderRadius: screenWidth * 0.02, // Responsive border radius (2% of screen width)
    marginBottom: screenHeight * 0.02, // Responsive margin from bottom (2% of screen height)
  },
  loginButtonText: {
    color: '#E0464E',
    fontSize: screenWidth * 0.04, // Responsive font size (4% of screen width)
    fontWeight: 'bold',
    textAlign: 'center',
  },
  orText: {
    color: '#AFB1B5',
    fontSize: screenWidth * 0.04, // Responsive font size (4% of screen width)
    marginBottom: screenHeight * 0.02, // Responsive margin from bottom (2% of screen height)
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: screenWidth * 0.5, // Responsive width (50% of screen width)
    height: screenHeight * 0.07, // Responsive height (7% of screen height)
  },
  circlecontainer: {
    width: screenWidth * 0.15, // Responsive width (15% of screen width)
    height: screenWidth * 0.15, // Responsive height (15% of screen width)
    borderRadius: screenWidth * 0.075, // Responsive border radius (7.5% of screen width)
    backgroundColor: '#F7F8F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    width: screenWidth * 0.1, // Responsive width (10% of screen width)
    height: screenWidth * 0.1, // Responsive height (10% of screen width)
  },
});

  export default HomeScreen;