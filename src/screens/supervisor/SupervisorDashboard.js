import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { commonStyles } from '../../styles/common';
import AppButton from '../../components/AppButton';
import { store } from '../../store/store';

export default function SupervisorDashboard({
  username,
  setEditingExpense,
  goTo,
}) {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    forceUpdate(n => n + 1);
  }, []);

  const myExpenses = store.expenses.filter(e => e.supervisor === username);
  const rejected = myExpenses.filter(e => e.status === 'REJECTED');
  const pending = myExpenses.filter(e => e.status === 'PENDING');

  const myNotifications = store.notifications.filter(
    n => n.supervisor === username
  );

  const globalWarnings = store.notifications.filter(
    n => n.type === 'PRICE_CHANGE'
  );

  return (
    <SafeAreaView style={commonStyles.container}>
      <Text style={commonStyles.title}>Supervisor: {username}</Text>

      {myNotifications.length > 0 && (
        <View style={commonStyles.card}>
          <Text style={{ fontWeight: 'bold' }}>Notifications</Text>
          {myNotifications.map(n => (
            <Text key={n.id}>{n.message}</Text>
          ))}
        </View>
      )}

      {globalWarnings.length > 0 && (
        <View style={[commonStyles.card, { backgroundColor: '#FFF3CD' }]}>
          <Text style={{ fontWeight: 'bold' }}>⚠ Warnings</Text>
          {globalWarnings.map(n => (
            <Text key={n.id}>{n.message}</Text>
          ))}
        </View>
      )}

      <Text style={commonStyles.subtitle}>Pending</Text>
      {pending.map(e => (
        <View key={e.id} style={commonStyles.card}>
          <Text>{e.materialName} – ₹{e.amount}</Text>
        </View>
      ))}

      <Text style={commonStyles.subtitle}>Rejected</Text>
      {rejected.map(e => (
        <View key={e.id} style={commonStyles.card}>
          <Text>{e.materialName}</Text>
          <Text style={{ color: 'red' }}>Reason: {e.rejectReason}</Text>
          <AppButton
            title="Edit & Resend"
            onPress={() => {
              setEditingExpense(e);
              goTo('addExpense');
            }}
          />
        </View>
      ))}

      <AppButton
        title="Add Material"
        onPress={() => {
          setEditingExpense(null);
          goTo('addExpense');
        }}
      />

      <AppButton title="Logout" type="danger" onPress={() => goTo('role')} />
    </SafeAreaView>
  );
}
