import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { commonStyles } from '../../styles/common';
import AppButton from '../../components/AppButton';
import { store } from '../../store/store';

export default function ManagerDashboard({ goTo }) { 

  // only approved expenses count
  const approvedExpenses = store.expenses.filter(
    e => e.status === 'APPROVED'
  );

  const totalExpense = approvedExpenses.reduce(
    (sum, e) => sum + e.amount,
    0
  );

  const overspendAlerts = store.notifications.filter(
  n => n.type === 'OVERSPENT'
);


  // placeholder for future income feature
  const totalIncome = 0;
  const totalProfit = totalIncome - totalExpense;

  return (
    <SafeAreaView style={commonStyles.container}>
      <Text style={commonStyles.appHeader}> RDN Creaters </Text>
      <Text style={commonStyles.title}>Manager Dashboard </Text>

      <View style={commonStyles.card}>
  <Text style={{ fontWeight: 'bold' }}>
    🔔 Notifications ({overspendAlerts.length})
  </Text>

  {overspendAlerts.map(n => (
    <Text key={n.id}>{n.message}</Text>
  ))}
</View>


      {/* TOTAL CARDS */}
      <View style={commonStyles.row}>
        <View style={commonStyles.card}>
          <Text>Total Expense</Text>
          <Text style={commonStyles.amount}>
            ₹{totalExpense}
          </Text>
        </View>

        <View style={commonStyles.card}>
          <Text>Total Income</Text>
          <Text style={commonStyles.amount}>
            ₹{totalIncome}
          </Text>
        </View>

        <View style={commonStyles.card}>
          <Text>Total Profit</Text>
          <Text style={commonStyles.amount}>
            ₹{totalProfit}
          </Text>
        </View>
      </View>

      {/* NAVIGATION */}
      <AppButton
        title="Manage Sites"
        onPress={() => goTo('siteManager')}
      />

      <AppButton
        title="Manage Materials"
        onPress={() => goTo('materialManager')}
      />

      <AppButton
        title="Approvals"
        onPress={() => goTo('approvals')}
      />

      <AppButton
         title="Assign Money to Supervisor"
         onPress={() => goTo('assignMoney')}
      />


      <AppButton
        title="Logout"
        type="danger"
        onPress={() => goTo('role')}
      />
    </SafeAreaView>
  );
}
