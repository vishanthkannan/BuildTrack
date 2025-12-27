import { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { commonStyles } from '../../styles/common';
import AppButton from '../../components/AppButton';
import {store,approveExpense,rejectExpense,addNotification} from '../../store/store';

export default function Approvals({ goTo }) {
  const [reasons, setReasons] = useState({});
  const [, forceUpdate] = useState(0);

  const pending = store.expenses.filter(e => e.status === 'PENDING');

  return (
    <SafeAreaView style={commonStyles.container}>
      <Text style={commonStyles.title}>Pending Approvals</Text>

      {pending.map(e => (
        <View key={e.id} style={commonStyles.card}>
          <Text>Site: {e.siteName}</Text>
          <Text>Supervisor: {e.supervisor}</Text>
          <Text>Material: {e.materialName}</Text>
          <Text>Amount: ₹{e.amount}</Text>

          {e.isPriceChanged && (
            <Text style={{ color: 'orange' }}>
              ⚠ Price changed (₹{e.managerPrice} → ₹{e.supervisorPrice})
            </Text>
          )}

          {e.isReApplied ? (
           <Text style={{ color: 'orange' }}>
          🔄 Re-applied request
            </Text>
          ) : (
           <Text style={{ color: 'green' }}>
          🆕 New request
            </Text>
          )}


          <TextInput
            style={commonStyles.input}
            placeholder="Reject reason"
            onChangeText={t => setReasons({ ...reasons, [e.id]: t })}
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
              if (!reasons[e.id]) {
                Alert.alert('Reason required');
                return;
              }
              rejectExpense(e.id, reasons[e.id]);
              addNotification({
                type: 'REJECTED',
                message: `❌ Material "${e.materialName}" rejected`,
                supervisor: e.supervisor,
                site: e.siteName,
              });
              forceUpdate(n => n + 1);
            }}
          />
        </View>
      ))}

      <AppButton title="Back" type="danger" onPress={() => goTo('managerDashboard')} />
    </SafeAreaView>
  );
}
