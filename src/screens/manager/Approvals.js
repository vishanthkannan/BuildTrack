
import { commonStyles } from '../../styles/common';
import AppButton from '../../components/AppButton';
import { SafeAreaView} from 'react-native-safe-area-context';
import { View, Text } from 'react-native';
import {
  store,
  approveExpense,
  rejectExpense,
} from '../../store/store';

export default function Approvals({ goTo }) {
  return (
    <SafeAreaView style={commonStyles.container}>
      <Text style={commonStyles.title}>Pending Approvals</Text>

      {store.expenses.length === 0 && (
        <Text>No pending materials</Text>
      )}

      {store.expenses.map(expense => (
        <View key={expense.id} style={commonStyles.card}>
          <Text>Supervisor: {expense.supervisor}</Text>
          <Text>Material: {expense.material}</Text>
          <Text>Amount: ₹{expense.amount}</Text>
          <Text>Date: {expense.date}</Text>
          <Text>Time: {expense.time}</Text>
          <Text>Status: {expense.status}</Text>

          {expense.status === 'PENDING' && (
            <>
              <AppButton
                title="Approve"
                type="success"
                onPress={() => approveExpense(expense.id)}
              />
              <AppButton
                title="Reject"
                type="danger"
                onPress={() => rejectExpense(expense.id)}
              />
            </>
          )}
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
