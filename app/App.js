import * as React from 'react';
import { Text, View, Dimensions, TextInput, Alert, ScrollView } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import firebase from 'firebase/app';
import 'firebase/auth';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Button} from 'react-native-elements/dist/buttons/Button';

import Onboarding from './components/onboarding';

// import firebaseConfig from "./firebase/config.js";

let Firebase;

const firebaseConfig = {
  apiKey: "AIzaSyANBHi3V09RP1iLKWhAUXz04ib7clyZsqM",
  authDomain: "qtma-f17f6.firebaseapp.com",
  projectId: "qtma-f17f6",
  storageBucket: "qtma-f17f6.appspot.com",
  messagingSenderId: "940280762171",
  appId: "1:940280762171:web:f722d1de39e65874bfb11e",
  measurementId: "G-65NB7Q1E2S"
};

!firebase.apps.length
    ? Firebase = firebase.initializeApp(firebaseConfig)
    : firebase.app();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function HomeScreen() {

}

function AdventureScreen() {
  return (
    <RecommendList />
  );
}

function ProfileScreen() {
    const auth = Firebase.auth();
    const authEmail = (email, pass) => {
        auth.createUserWithEmailAndPassword(email, pass)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                Alert.alert("User signed up: " + user.email);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert("Error Code " + errorCode + " " + errorMessage)
            });
  }

  const signInAnon = () => {
      auth.signInAnonymously()
      .then(() => {
          // Signed in..
          Alert.alert("Signed in as Anonymous");
          // ...
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Alert.alert("Error Code "+errorCode+" "+errorMessage)
      });
  }

  const signInEmail = (email, pass) => {
    auth.signInWithEmailAndPassword(email, pass)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            Alert.alert("User signed in: " + user.email);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert.alert("Error Code " + errorCode + " " + errorMessage)
        });
  }
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Profile!</Text>
        <TextInput
            onChangeText={email => setEmail(email)}
            defaultValue={email}
            placeholder="Email"
            keyboardType="email-address"
        />
        <TextInput
            onChangeText={pass => setPass(pass)}
            defaultValue={pass}
            placeholder="Password"
            keyboardType="default"
        />
        <Button
            onPress={() => authEmail(email, pass)}
            title="Sign Up"
        />
        <Button
            onPress={() => signInEmail(email, pass)}
            title="Sign In"
        />
        <Button
            onPress={() => signInAnon()}
            title="Sign In Anonymously"
        />
    </View>
);
}

function RecommendScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Recommendations!</Text>
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
            } else if (route.name === 'Adventure') {
              iconName = 'ios-map';
            } else if (route.name === 'Profile') {
              iconName = 'ios-person';
            } else if (route.name === 'Recommend') {
              iconName = 'ios-add-circle';
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
        <Tab.Screen name="Adventure" component={AdventureScreen} />
        <Tab.Screen name="Recommend" component={RecommendScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
