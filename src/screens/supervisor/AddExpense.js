
import { useState } from 'react';
import { commonStyles } from '../../styles/common';
import AppButton from '../../components/AppButton';
import { addExpense } from '../../store/store';
import { getCurrentDateTime } from '../../utils/dateTime';
import { SafeAreaView} from 'react-native-safe-area-context';
import {Text,TextInput} from 'react-native';

export default function AddExpense({ username, goTo }) {
  const [material, setMaterial] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = () => {
    const { date, time } = getCurrentDateTime();

    addExpense({
      supervisor: username,
      material,
      amount: Number(amount),
      date,
      time,
    });

    goTo('supervisorDashboard');
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <Text style={commonStyles.title}>Add Material</Text>

      <TextInput
        style={commonStyles.input}
        placeholder="Material name"
        value={material}
        onChangeText={setMaterial}
      />

      <TextInput
        style={commonStyles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <AppButton title="Submit" onPress={handleSubmit} />
      <AppButton
        title="Back"
        type="danger"
        onPress={() => goTo('supervisorDashboard')}
      />
    </SafeAreaView>
  );
}
