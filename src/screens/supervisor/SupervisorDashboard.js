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
  // 🔁 force re-render when screen opens
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    forceUpdate(n => n + 1);
  }, []);

  const myExpenses = store.expenses.filter(
    e => e.supervisor === username
  );

  const pending = myExpenses.filter(
    e => e.status === 'PENDING'
  );

  const rejected = myExpenses.filter(
    e => e.status === 'REJECTED'
  );

  return (
    <SafeAreaView style={commonStyles.container}>
      <Text style={commonStyles.title}>
        Supervisor: {username}
      </Text>

      {/* PENDING */}
      <Text style={commonStyles.subtitle}>
        Waiting for Approval
      </Text>

      {pending.length === 0 && (
        <Text>No pending materials</Text>
      )}

      {pending.map(e => (
        <View key={e.id} style={commonStyles.card}>
          <Text>Site: {e.siteName}</Text>
          <Text>Material: {e.materialName}</Text>
          <Text>Amount: ₹{e.amount}</Text>
          <Text>Status: PENDING</Text>
        </View>
      ))}

      {/* REJECTED */}
      <Text style={commonStyles.subtitle}>
        Rejected Materials
      </Text>

      {rejected.length === 0 && (
        <Text>No rejected materials</Text>
      )}

      {rejected.map(e => (
        <View key={e.id} style={commonStyles.card}>
          <Text>Site: {e.siteName}</Text>
          <Text>Material: {e.materialName}</Text>
          <Text style={{ color: 'red' }}>
            Reason: {e.rejectReason}
          </Text>

          <AppButton
            title="Edit & Resend"
            onPress={() => {
              setEditingExpense(e); // ✅ CRITICAL
              goTo('addExpense');
            }}
          />
        </View>
      ))}

      <AppButton
        title="Add Material"
        onPress={() => {
          setEditingExpense(null); // fresh form
          goTo('addExpense');
        }}
      />

      <AppButton
        title="Logout"
        type="danger"
        onPress={() => goTo('role')}
      />
    </SafeAreaView>
  );
}
