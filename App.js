import { useState, useEffect } from "react";
import { Text } from "react-native";
import { useFonts } from "expo-font";
import { AntDesign } from '@expo/vector-icons';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DarkTheme } from '@react-navigation/native';

import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import StartScreen from "./screens/StartScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import Settings from "./screens/Settings";
import PhoneScreen from "./screens/PhoneScreen";
import DummyScreen from "./screens/DummyScreen";


const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

export default function App() {

  // Load Fonts
  const [fontsLoaded] = useFonts({
    "BioSans-Light": require("./assets/fonts/BioSans-Light.otf"),
    "BioSans-Regular": require("./assets/fonts/BioSans-Regular.otf"),
    "BioSans-SemiBold": require("./assets/fonts/BioSans-SemiBold.otf"),
    "BioSans-Bold": require("./assets/fonts/BioSans-Bold.otf"),
  })

  const [authData, setAuthData] = useState(null);

  // Check if the user is logged in or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthData(user);
    });

    return unsubscribe;
  }, []);

  // While fonts are loading, show "loading-message"
  if (!fontsLoaded) {
    return <Text>Loading...</Text>
  }

  // Bottom Tab Stack
  function BottomTabs() {
    return (
      <BottomTab.Navigator screenOptions={{
        tabBarStyle: { height: 60},
        tabBarLabelStyle: { marginBottom: 8, fontSize: 12 },
        tabBarIconStyle: { marginTop: 8}
      }}>
        <BottomTab.Screen name="Home" component={HomeScreen} options={{
          tabBarIcon: ({color, size}) => <AntDesign name="message1" size={26} color={color} />,
          tabBarLabel: 'Home',
          headerShown: false
        }} />
        <BottomTab.Screen name="Phone" component={PhoneScreen} options={{
          tabBarIcon: ({color, size}) => <AntDesign name="phone" size={26} color={color} />,
          tabBarLabel: 'Phone'
        }} />
        <BottomTab.Screen name="Dummy" component={DummyScreen} options={{
          tabBarIcon: ({color, size}) => <AntDesign name="camerao" size={26} color={color} />,
          tabBarLabel: 'Camera'
        }} />
        <BottomTab.Screen name="Settings" component={Settings} options={{
          tabBarIcon: ({color, size}) => <AntDesign name="setting" size={26} color={color} />,
          tabBarLabel: 'Settings'
        }} />
      </BottomTab.Navigator>
    )
  }

  return (
    <NavigationContainer theme={DarkTheme}>
      {authData ? (
        <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={BottomTabs} options={{headerShown: false}}/>
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Start" component={StartScreen} options={{headerShown: false  }}/>
          <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: false  }}/>
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false  }}/>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
