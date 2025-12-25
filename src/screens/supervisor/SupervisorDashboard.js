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
  // force refresh when screen opens
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

  const approved = myExpenses.filter(
    e => e.status === 'APPROVED'
  );

  // TOTALS
  const totalSubmitted = myExpenses.reduce(
    (sum, e) => sum + e.amount,
    0
  );

  const approvedTotal = approved.reduce(
    (sum, e) => sum + e.amount,
    0
  );

  const pendingTotal = pending.reduce(
    (sum, e) => sum + e.amount,
    0
  );

  // notifications
  const myNotifications = store.notifications.filter(
    n => n.supervisor === username
  );

  const globalWarnings = store.notifications.filter(
    n => n.type === 'PRICE_CHANGE'
  );

  return (
    <SafeAreaView style={commonStyles.container}>
      <Text style={commonStyles.title}>
        Supervisor: {username}
      </Text>

      {/* TOTAL CARDS */}
      <View style={commonStyles.row}>
        <View style={commonStyles.card}>
          <Text>Total Submitted</Text>
          <Text style={commonStyles.amount}>
            ₹{totalSubmitted}
          </Text>
        </View>

        <View style={commonStyles.card}>
          <Text>Approved</Text>
          <Text style={commonStyles.amount}>
            ₹{approvedTotal}
          </Text>
        </View>

        <View style={commonStyles.card}>
          <Text>Pending</Text>
          <Text style={commonStyles.amount}>
            ₹{pendingTotal}
          </Text>
        </View>
      </View>

      {/* NOTIFICATIONS */}
      {myNotifications.length > 0 && (
        <View style={commonStyles.card}>
          <Text style={commonStyles.subtitle}>
            Notifications
          </Text>
          {myNotifications.map(n => (
            <Text key={n.id}>{n.message}</Text>
          ))}
        </View>
      )}

      {globalWarnings.length > 0 && (
        <View
          style={[
            commonStyles.card,
            { backgroundColor: '#FFF3CD' },
          ]}
        >
          <Text style={commonStyles.subtitle}>
            ⚠ Warnings
          </Text>
          {globalWarnings.map(n => (
            <Text key={n.id}>{n.message}</Text>
          ))}
        </View>
      )}

      {/* PENDING */}
      <Text style={commonStyles.subtitle}>
        Waiting for Approval
      </Text>

      {pending.map(e => (
        <View key={e.id} style={commonStyles.card}>
          <Text>{e.materialName}</Text>
          <Text>₹{e.amount}</Text>
        </View>
      ))}

      {/* REJECTED */}
      <Text style={commonStyles.subtitle}>
        Rejected
      </Text>

      {rejected.map(e => (
        <View key={e.id} style={commonStyles.card}>
          <Text>{e.materialName}</Text>
          <Text style={{ color: 'red' }}>
            Reason: {e.rejectReason}
          </Text>

          <AppButton
            title="Edit & Resend"
            onPress={() => {
              setEditingExpense(e);
              goTo('addExpense');
            }}
          />
        </View>
      ))}

      {/* ACTIONS */}
      <AppButton
        title="Add Material"
        onPress={() => {
          setEditingExpense(null);
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
