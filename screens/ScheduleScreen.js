import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

export default function ScheduleScreen() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSubmit = () => {
    if (selectedDate) {
      Alert.alert('Appointment Scheduled', `You selected ${selectedDate.toString()}`);
    } else {
      Alert.alert('Error', 'Please select a date.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schedule Your Appointment</Text>
      <CalendarPicker onDateChange={setSelectedDate} />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});
