import React, { useEffect, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

const { width, height } = Dimensions.get('window');

const SideMenu = ({ isVisible, onClose }) => {
    const navigation = useNavigation();
    const { logout } = useAuth();
    const translateX = useRef(new Animated.Value(width)).current;
  
    useEffect(() => {
      Animated.timing(translateX, {
        toValue: isVisible ? 0 : width,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, [isVisible]);
  
    const handleClose = () => {
      Animated.timing(translateX, {
        toValue: width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => onClose()); // Ensure onClose is called after animation completes
    };
  
    return (
      <Animated.View style={[styles.menuContainer, { transform: [{ translateX }] }]}> 
        {/* Close Menu */}
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Text style={styles.arrow}>{'→'}</Text>
        </TouchableOpacity>
  
        {/* Logout Button */}
        <TouchableOpacity onPress={() => logout(navigation)} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </Animated.View>
    );
};

const styles = {
  menuContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: width * 0.4,
    height: height,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 26,
    right: width * 0.42 - 60, // Adjusting so the arrow is inside the menu and parallel to the settings icon
    padding: 16,
  },
  arrow: {
    fontSize: 24,
  },
  logoutButton: {
    padding: 16,
    marginTop: 80,
  },
  logoutText: {
    fontSize: 18,
    color: 'red',
  }
};

export default SideMenu;
