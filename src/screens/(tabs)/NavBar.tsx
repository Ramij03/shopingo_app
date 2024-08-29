// BottomTabs.tsx
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../(tabs)/HomePage';
import ProfilePage from '../(tabs)/ProfilePage';
import SearchPage from '../(tabs)/SearchPage';
import FavoritePage from '../(tabs)/FavoritePage';
import CartPage from './CartPage';

const Tab = createBottomTabNavigator();

const BottomTabs: React.FC = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        height: 60,
        ...styles.shadow
      },
      tabBarShowLabel: false,
    }}
    >
      <Tab.Screen name="Home" component={HomePage} options={{ headerShown:false,tabBarIcon:({focused}) =>(
        <View style={{alignItems:'center',justifyContent:'center',top:10}}>
          <Image source={require('../../assets/icons/Home1.png')}
            resizeMode="contain"
            style={{
              width:25,
              height:25,
              tintColor: focused? '#e32f45': '#F9AB9E'
            }}
          />
          <Text style={{color: focused? '#e32f45': '#F9AB9E', fontSize:12,marginBottom:12}}>Explore</Text>
        </View>
       ), 
      }} />
      <Tab.Screen name="Search" component={SearchPage} options={{ headerShown:false,tabBarIcon:({focused}) =>(
        <View style={{alignItems:'center',justifyContent:'center',top:10}}>
          <Image source={require('../../assets/icons/Search.png')}
            resizeMode="contain"
            style={{
              width:25,
              height:25,
              tintColor: focused? '#e32f45': '#F9AB9E'
            }}
          />
          <Text style={{color: focused? '#e32f45': '#F9AB9E', fontSize:12,marginBottom:12}}>Search</Text>
        </View>
       ), 
      }} />
      <Tab.Screen name="CartPage" component={CartPage} options={{ headerShown:false,tabBarIcon:({focused}) =>(
        <View style={styles.cartIcon}>
          <Image source={require('../../assets/icons/Cart1.png')}
            resizeMode="contain"
            style={{
              width:25,
              height:25,
              tintColor: focused? '#FFFFFF': '#efefef',
            }}
          />
        </View>
       ), 
      }} />
      <Tab.Screen name="Favorite" component={FavoritePage} options={{ headerShown:false,tabBarIcon:({focused}) =>(
        <View style={{alignItems:'center',justifyContent:'center',top:10}}>
          <Image source={require('../../assets/icons/Love1.png')}
            resizeMode="contain"
            style={{
              width:25,
              height:25,
              tintColor: focused? '#e32f45': '#F9AB9E'
            }}
          />
          <Text style={{color: focused? '#e32f45': '#F9AB9E', fontSize:12,marginBottom:12}}>Favorite</Text>
        </View>
       ), 
      }} />
      <Tab.Screen name="Profile" component={ProfilePage} options={{ headerShown:false,tabBarIcon:({focused}) =>(
        <View style={{alignItems:'center',justifyContent:'center',top:10}}>
          <Image source={require('../../assets/icons/User1.png')}
            resizeMode="contain"
            style={{
              width:25,
              height:25,
              tintColor: focused? '#e32f45': '#F9AB9E'
            }}
          />
          <Text style={{color: focused? '#e32f45': '#F9AB9E', fontSize:12,marginBottom:12}}>Profile</Text>
        </View>
       ), 
      }} />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  shadow:{
    shadowColor:'#7F5DF0',
    shadowOffset:{
      width:0,
      height:10,
    },
    shadowOpacity:0.25,
    shadowRadius:3.5,
    elevation:5
  },
  cartIcon: {
    position: 'absolute',
    top: -15,
    left: '70%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#e32f45',
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor:'#7F5DF0',
    shadowOffset:{
      width:0,
      height:10,
    },
    shadowOpacity:0.25,
    shadowRadius:3.5,
    elevation:5
  }
});
export default BottomTabs;
