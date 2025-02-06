import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SideMenu from './SideMenu';
import colors from '../assets/styles';

const WithSettings = ({ children }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const toggleMenu = () => setMenuVisible(!menuVisible);
  
    return (
      <View style={{ flex: 1 }}>
        {/* Settings Icon - Hidden when menu is open */}
        {!menuVisible && (
          <TouchableOpacity onPress={toggleMenu} style={{ position: 'absolute', top: 50, right: 20, zIndex: 10 }}>
            <Icon name="settings" size={30} color={colors.accent} />
          </TouchableOpacity>
        )}
        {children}
        {menuVisible && <SideMenu isVisible={menuVisible} onClose={toggleMenu} />}
      </View>
    );
};

export default WithSettings;
