import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SideMenu from './SideMenu';

const WithSettings = ({ children }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const toggleMenu = () => setMenuVisible(!menuVisible);
  
    return (
      <View style={{ flex: 1 }}>
        {/* Settings Icon - Hidden when menu is open */}
        {!menuVisible && (
          <TouchableOpacity onPress={toggleMenu} style={{ position: 'absolute', top: 40, right: 20, zIndex: 10 }}>
            <Text style={{ fontSize: 28 }}>{'⚙️'}</Text>
          </TouchableOpacity>
        )}
        {children}
        {menuVisible && <SideMenu isVisible={menuVisible} onClose={toggleMenu} />}
      </View>
    );
};

export default WithSettings;
