import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ItineraryScreen from './screens/ItineraryScreen';
import ExcursionsScreen from './screens/ExcursionsScreen';
import MessagingScreen from './screens/MessagingScreen';
import MapsScreen from './screens/MapsScreen';
import LoginScreen from './screens/LoginScreen';
import WithSettings from './components/WithSettings';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from './context/AuthContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <WithSettings>
      <Tab.Navigator initialRouteName="Itinerary">
        <Tab.Screen name="Itinerary" component={ItineraryScreen} />
        <Tab.Screen name="Excursions" component={ExcursionsScreen} />
        <Tab.Screen name="Messaging" component={MessagingScreen} />
        <Tab.Screen name="Maps" component={MapsScreen} />
      </Tab.Navigator>
    </WithSettings>
  );
}

function AppNavigator() {
  const { user } = useAuth();
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main" component={MainTabs} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
