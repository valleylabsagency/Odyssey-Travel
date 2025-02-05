import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    loadUser();
  }, []);

  const login = async (userData, navigation) => {
    setUser(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    navigation.navigate({
      index: 0,
      routes: [{ name: 'MainTabs' }], // This should match the name of the tab navigator in AppNavigator
    });
  };

  const logout = async (navigation) => {
    setUser(null);
    await AsyncStorage.removeItem('user');
    navigation.replace('Login'); // Redirect to Login after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
