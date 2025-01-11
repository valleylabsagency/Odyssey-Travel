import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ScheduleScreen() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date.toString());
    setShowTimePicker(true);
  };

  const handleTimeChange = (event, selected) => {
    setShowTimePicker(false); // Close the time picker after selection
    if (selected) {
      setSelectedTime(selected); // Save the selected time
    }
  };

  const handleConfirm = () => {
    if (!selectedTime || !selectedDate) {
      Alert.alert('Error', 'Please select both a date and time.');
    } else {
      const formattedTime = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      Alert.alert(
        'Appointment Confirmed',
        `Date: ${selectedDate}\nTime: ${formattedTime}`
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schedule Your Appointment</Text>

      {/* Calendar Picker */}
      <CalendarPicker onDateChange={handleDateChange} />

      {/* Time Picker */}
      {showTimePicker && (
        <DateTimePicker
          mode="time"
          value={selectedTime || new Date()} // Default to current time
          onChange={handleTimeChange}
        />
      )}

      {selectedDate && selectedTime && (
        <View style={styles.summary}>
          <Text style={styles.summaryText}>Date: {selectedDate}</Text>
          <Text style={styles.summaryText}>
            Time: {selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      )}

      {selectedDate && selectedTime && (
        <Button title="Confirm" onPress={handleConfirm} />
      )}
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
  summary: {
    marginVertical: 20,
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
