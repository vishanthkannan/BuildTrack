
import { commonStyles } from '../../styles/common';
import AppButton from '../../components/AppButton';
import { SafeAreaView} from 'react-native-safe-area-context';
import { View, Text } from 'react-native';

export default function SupervisorDashboard({ username, goTo }) {
  return (
    <SafeAreaView style={commonStyles.container}>
      <Text style={commonStyles.title}>
        Supervisor: {username}
      </Text>

      <View style={commonStyles.card}>
        <Text>Amount Gained</Text>
        <Text>₹0</Text>
      </View>

      <View style={commonStyles.card}>
        <Text>Expense</Text>
        <Text>₹0</Text>
      </View>

      <View style={commonStyles.card}>
        <Text>Remaining</Text>
        <Text>₹0</Text>
      </View>

      <AppButton
        title="Add Material"
        onPress={() => goTo('addExpense')}
      />

      <AppButton
        title="Notifications"
        onPress={() => goTo('notifications')}
      />

      <AppButton
        title="Logout"
        type="danger"
        onPress={() => goTo('role')}
      />
    </SafeAreaView>
  );
}
