import * as React from 'react';
import { Text, View, Dimensions, TextInput, Alert, ScrollView } from 'react-native';

import firebase from 'firebase/app';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Button} from 'react-native-elements/dist/buttons/Button';

import Onboarding from './components/onboarding';

// import firebaseConfig from "./firebase/config.js";

let Firebase;

const firebaseConfig = {
  apiKey: "AIzaSyDA2FWfaOZlOMv6BNwZWOW-Rg_lqjW8RIU",
  authDomain: "atomic-router-331320.firebaseapp.com",
  projectId: "atomic-router-331320",
  storageBucket: "atomic-router-331320.appspot.com",
  messagingSenderId: "401948900377",
  appId: "1:401948900377:web:0b9f401912c85c8027be88",
  measurementId: "G-G1PLHBEPH9"
};

!firebase.apps.length
    ? Firebase = firebase.initializeApp(firebaseConfig)
    : firebase.app();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Home</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Profile!</Text>
    </View>
);
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'ios-home';
            } else if (route.name === 'Profile') {
              iconName = 'ios-person';
            } 

            return <Ionicons style={{ marginTop: 6 }} name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          tabBarLabelStyle: { marginBottom: 2 }
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
