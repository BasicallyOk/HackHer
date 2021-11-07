import * as React from 'react';
import { Text, View, Dimensions, TextInput, Alert, ScrollView } from 'react-native';

import firebase from 'firebase/app';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Button} from 'react-native-elements/dist/buttons/Button';

import Onboarding from './components/onboarding';

import Swiper from 'react-native-swiper'

import FlatButton from './components/button';

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

var data;

function HomeScreen() {
  const [gender, onChangeGender] = React.useState('');
  const [age, onChangeAge] = React.useState('');
  const [smoking, onChangeSmoking] = React.useState('');
  const [yellow, onChangeYellow] = React.useState('');
  const [anxiety, onChangeAnxiety] = React.useState('');
  const [pp, onChangePp] = React.useState('');
  const [chronic, onChangeChronic] = React.useState('');
  const [fatigue, onChangeFatigue] = React.useState('');
  const [allergy, onChangeAllergy] = React.useState('');
  const [wheeze, onChangeWheeze] = React.useState('');
  const [alcohol, onChangeAlcohol] = React.useState('');
  const [coughing, onChangeCoughing] = React.useState('');
  const [breath, onChangeBreath] = React.useState('');
  const [swallowing, onChangeSwallowing] = React.useState('');
  const [chest, onChangeChest] = React.useState('');

  const submit = () => {
    data = {
      "instances": [
        {
          GENDER: gender,
          AGE: parseInt(age),
          SMOKING: smoking,
          YELLOW_FINGERS: yellow,
          ANXIETY: anxiety,
          PEER_PRESSURE: pp,
          CHRONIC_DISEASE: chronic,
          FATIGUE: fatigue,
          ALLERGY: allergy,
          WHEEZING: wheeze,
          ALCOHOL_CONSUMING: alcohol,
          COUGHING: coughing,
          SHORT_OF_BREATH: breath,
          SWALLOWING_DIFFICULTY: swallowing,
          CHEST_PAIN: chest
        }
      ]
    }
    Alert.alert("Data recorded")
}

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Home</Text>
        <TextInput
          onChangeText={onChangeGender}
          value={gender}
          placeholder="Gender"
        />
        <TextInput
          onChangeText={onChangeAge}
          value={age}
          placeholder="Age"
          keyboardType="numeric"
        />
        <TextInput
          onChangeText={onChangeSmoking}
          value={smoking}
          placeholder="Smoking"
        />
        <TextInput
          onChangeText={onChangeYellow}
          value={yellow}
          placeholder="Yellow Fingers"
        />
        <TextInput
          onChangeText={onChangeAnxiety}
          value={anxiety}
          placeholder="Anxiety"
        />
        <TextInput
          onChangeText={onChangePp}
          value={pp}
          placeholder="Peer Pressured"
        />
        <TextInput
          onChangeText={onChangeChronic}
          value={chronic}
          placeholder="Chronic Disease"
        />
        <TextInput
          onChangeText={onChangeFatigue}
          value={fatigue}
          placeholder="Fatigue"
        />
        <TextInput
          onChangeText={onChangeAllergy}
          value={allergy}
          placeholder="Allergy"
        />
        <TextInput
          onChangeText={onChangeWheeze}
          value={wheeze}
          placeholder="Wheezing"
        />
        <TextInput
          onChangeText={onChangeAlcohol}
          value={alcohol}
          placeholder="Consume Alcohol"
        />
        <TextInput
          onChangeText={onChangeCoughing}
          value={coughing}
          placeholder="Coughing"
        />
        <TextInput
          onChangeText={onChangeBreath}
          value={breath}
          placeholder="Shortness of Breath"
        />
        <TextInput
          onChangeText={onChangeSwallowing}
          value={swallowing}
          placeholder="Difficulty Swallowing"
        />
        <TextInput
          onChangeText={onChangeChest}
          value={chest}
          placeholder="Chest Pain"
        />
        <FlatButton text='submit' onPress={submit}
        />
    </View>
  );
}

// Discouraged, I'm sure, but I'm a beginner on Javascript
function useForceUpdate(){
  const [value, setValue] = React.useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}

function ProfileScreen() {
  // Hardcode, need to learn HTTP requests and web protocols to implement
  let response;
  if (data.instances[0].SMOKING === "TRUE"){
    response="You should visit a doctor";
  } else response="You do not require medical attention. However, this should not be treated as the definitive answer, please perform a checkup routinely";
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Gender: { data.instances[0].GENDER }</Text>
        <Text>Age: { data.instances[0].AGE }</Text>
        <Text>{ response }</Text>
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
