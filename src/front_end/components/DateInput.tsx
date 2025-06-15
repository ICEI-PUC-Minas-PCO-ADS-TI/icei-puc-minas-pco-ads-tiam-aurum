import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';

interface DateInputProps {
  value: Date;
  onChange: (date: Date) => void;
  label?: string;
  style?: Object;
}

const DateInput: React.FC<DateInputProps> = ({ value, onChange, label, style }) => {
  const [show, setShow] = useState(false);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View style={{ marginVertical: 8 }}>
      {label && <Text style={style ? style : { marginBottom: 4 }}>{label}</Text>}
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 10,
          backgroundColor: '#fff',
        }}
        onPress={() => setShow(true)}
      >
        <Text>{value ? value.toLocaleDateString() : 'Selecione uma data'}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChangeDate}
        />
      )}
    </View>
  );
};

export default DateInput;