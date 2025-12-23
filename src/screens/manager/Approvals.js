import { View, Text, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

import { commonStyles } from '../../styles/common';
import AppButton from '../../components/AppButton';
import {
  store,
  approveExpense,
  rejectExpense,
} from '../../store/store';

export default function Approvals({ goTo }) {
  const [reasonMap, setReasonMap] = useState({});
  const [, forceUpdate] = useState(0);


  const pending = store.expenses.filter(
    e => e.status === 'PENDING'
  );
  const approved = store.expenses.filter(
    e => e.status === 'APPROVED'
  );
  const rejected = store.expenses.filter(
    e => e.status === 'REJECTED'
  );

  return (
    <SafeAreaView style={commonStyles.container}>
      <Text style={commonStyles.title}>
        Pending Approvals
      </Text>

      {pending.length === 0 && (
        <Text>No pending materials</Text>
      )}

      {pending.map(e => (
        <View key={e.id} style={commonStyles.card}>
          <Text>Site: {e.siteName}</Text>
          <Text>Supervisor: {e.supervisor}</Text>
          <Text>Material: {e.materialName}</Text>
          <Text>Amount: ₹{e.amount}</Text>

          {e.isManualMaterial && (
            <Text style={{ color: 'red' }}>
              ⚠ Manual Material
            </Text>
          )}

          <TextInput
            style={commonStyles.input}
            placeholder="Reject reason (if any)"
            onChangeText={text =>
              setReasonMap({
                ...reasonMap,
                [e.id]: text,
              })
            }
          />

          <AppButton
            title="Approve"
            type="success"
            onPress={() => {
            approveExpense(e.id);
            forceUpdate(n => n + 1);
            }}

          />

          <AppButton
            title="Reject"
            type="danger"
            onPress={() => {
              if (!reasonMap[e.id]) {
                Alert.alert(
                  'Reason required',
                  'Enter reject reason'
                );
                return;
              }
              rejectExpense(e.id, reasonMap[e.id]);
              forceUpdate(n => n + 1);
            }}
          />
        </View>
      ))}

      <Text style={commonStyles.title}>Approved</Text>
      {approved.map(e => (
        <View key={e.id} style={commonStyles.card}>
          <Text>
            {e.materialName} – ₹{e.amount}
          </Text>
        </View>
      ))}

      <Text style={commonStyles.title}>Rejected</Text>
      {rejected.map(e => (
        <View key={e.id} style={commonStyles.card}>
          <Text>{e.materialName}</Text>
          <Text style={{ color: 'red' }}>
            Reason: {e.rejectReason}
          </Text>
        </View>
      ))}

      <AppButton
        title="Back"
        type="danger"
        onPress={() => goTo('managerDashboard')}
      />
    </SafeAreaView>
  );
}
