import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './src/screens/(auth)/SignUpScreen';
import SignInScreen from './src/screens/(auth)/SignInScreen';
import HomeScreen from './src/screens/(auth)/HomeScreen';
import ForgetPassword from './src/screens/(auth)/ForgetPassword';
import ResetPassword from './src/screens/(auth)/NewPasswordScreen';
import WelcomeScreen from './src/screens/(auth)/WelcomeScreen';
import VerifyScreen from './src/screens/(auth)/VerifyScreen';
import HomePage from './src/screens/(tabs)/HomePage';
import ProfilePage from './src/screens/(tabs)/ProfilePage';
import FavoritePage from './src/screens/(tabs)/FavoritePage';
import SearchPage from './src/screens/(tabs)/SearchPage';
import BottomTabs from './src/screens/(tabs)/NavBar';
import CartPage from './src/screens/(tabs)/CartPage';
import ProductDetail from './src/screens/(tabs)/ProductDetail';
import StoryView from './src/screens/components/StoryView';
import { CartProvider } from './src/screens/components/CartContext';
import messaging from '@react-native-firebase/messaging';
import OnBoard from './src/screens/(auth)/OnBoard';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/screens/store/Store';

type RootStackParamList = {
  Home: undefined;
  SignUp: undefined;
  Login: undefined;
  ForgetPassword: undefined;
  ResetPassword: undefined;
  Verify: { verificationCode: string };
  Welcome: undefined;
  OnBoard: undefined;
  HomePage: undefined;
  BottomTabs: undefined;
  ProfilePage: undefined;
  FavoritePage: undefined;
  SearchPage: undefined;
  CartPage: undefined;
  ProductDetail: { productId: string };
  StoryView: { storyId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();



function App(): React.JSX.Element {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const getToken= async() => {
    const token= await messaging().getToken();
    console.log("Token:", token);
  }

  useEffect(()=>{
    requestUserPermission()
    getToken()
  },[])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <GestureHandlerRootView style={{ flex: 1 }}> 
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="OnBoard"
        screenOptions={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#383B46',
            fontFamily: 'SourceSansPro-Semibold',
          },
          headerTransparent: true,
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      >
        <Stack.Screen name="OnBoard" component={OnBoard} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            title: 'Sign Up',
          }}
        />
        <Stack.Screen
          name="Login"
          component={SignInScreen}
          options={{
            title: 'Login',
          }}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{
            title: 'Forget Password',
          }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{
            title: 'Reset Password',
          }}
        />
        <Stack.Screen
          name="Verify"
          component={VerifyScreen}
          options={{
            title: 'Verify',
          }}
        />
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BottomTabs" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{
            title: 'Explore',
          }}
        />
        <Stack.Screen
          name="SearchPage"
          component={SearchPage}
          options={{
            title: 'Explore',
          }}
        />
        <Stack.Screen
          name="FavoritePage"
          component={FavoritePage}
          options={{
            title: 'Explore',
          }}
        />
        <Stack.Screen
          name="ProfilePage"
          component={ProfilePage}
          options={{
            title: 'Explore',
          }}
        />
        <Stack.Screen
          name="CartPage"
          component={CartPage}
          options={{
            title: 'Cart',
          }}
        />
        <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false }} />
        <Stack.Screen name="StoryView" component={StoryView} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
   </GestureHandlerRootView>
      </PersistGate>
    </Provider>
    
  );
}

export default App;
