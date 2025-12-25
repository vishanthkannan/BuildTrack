import { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { commonStyles } from '../../styles/common';
import AppButton from '../../components/AppButton';
import {
  addFundsToSupervisor,
  getSupervisorFunds,
} from '../../store/store';

export default function AssignMoney({ goTo }) {
  const [supervisor, setSupervisor] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddMoney = () => {
    if (!supervisor.trim() || !amount) {
      Alert.alert('Error', 'Fill all fields');
      return;
    }

    const value = Number(amount);
    if (value <= 0) {
      Alert.alert('Error', 'Invalid amount');
      return;
    }

    addFundsToSupervisor(supervisor.trim(), value);

    Alert.alert(
      'Success',
      `₹${value} added to ${supervisor}`
    );

    setAmount('');
  };

  const currentBalance = supervisor
    ? getSupervisorFunds(supervisor.trim())
    : 0;

  return (
    <SafeAreaView style={commonStyles.container}>
      <Text style={commonStyles.title}>
        Assign Money to Supervisor
      </Text>

      <View style={commonStyles.card}>
        <TextInput
          style={commonStyles.input}
          placeholder="Supervisor name"
          value={supervisor}
          onChangeText={setSupervisor}
        />
      </View>

      {supervisor !== '' && (
        <View style={commonStyles.card}>
          <Text>
            Current Allocated Amount: ₹
            {currentBalance}
          </Text>
        </View>
      )}

      <View style={commonStyles.card}>
        <TextInput
          style={commonStyles.input}
          placeholder="Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      <AppButton title="Add Money" onPress={handleAddMoney} />

      <AppButton
        title="Back"
        type="danger"
        onPress={() => goTo('managerDashboard')}
      />
    </SafeAreaView>
  );
}
