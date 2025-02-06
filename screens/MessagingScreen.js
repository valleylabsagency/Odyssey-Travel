import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import colors from '../assets/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function MessagingScreen() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim().length > 0) {
      setMessages([...messages, { id: messages.length.toString(), text: inputText }]);
      setInputText('');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 70}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat with Carmen</Text>
        <View style={styles.statusContainer}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Online</Text>
        </View>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageBubble}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={styles.messagesContainer}
        inverted={false} // Ensures messages are displayed from top to bottom
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="iMessage"
          placeholderTextColor={colors.secondary}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Icon name="send" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingBottom: 80, // Ensures input field is visible when typing
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    marginRight: 5,
  },
  statusText: {
    fontSize: 14,
    color: 'gray',
  },
  messagesContainer: {
    flexGrow: 1,
    alignItems: 'flex-end', // Ensures messages start at the top
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  messageBubble: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    maxWidth: '70%',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  messageText: {
    fontSize: 16,
    color: colors.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.background,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    color: colors.primary,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  sendButton: {
    marginLeft: 10,
    padding: 10,
  },
});
