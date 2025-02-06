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
import Icon from 'react-native-vector-icons/MaterialIcons'; 


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <WithSettings>
      <Tab.Navigator
       initialRouteName="Itinerary"
       screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Itinerary') {
            iconName = 'flight'; // Icon for Itinerary
          } else if (route.name === 'Excursions') {
            iconName = 'scuba-diving'; // Icon for Excursions
          } else if (route.name === 'Messaging') {
            iconName = 'chat'; // Icon for Messaging
          } else if (route.name === 'Maps') {
            iconName = 'map'; // Icon for Maps
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
       >
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
