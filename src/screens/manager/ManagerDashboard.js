
import { commonStyles } from '../../styles/common';
import AppButton from '../../components/AppButton';
import { SafeAreaView} from 'react-native-safe-area-context';
import { View, Text } from 'react-native';

export default function ManagerDashboard({ goTo }) {
  return (
    <SafeAreaView style={commonStyles.container}>
      <Text style={commonStyles.title}>Manager Dashboard</Text>

      <View style={commonStyles.card}>
        <Text>Total Amount Gained</Text>
        <Text>₹0</Text>
      </View>

      <View style={commonStyles.card}>
        <Text>Total Expense</Text>
        <Text>₹0</Text>
      </View>

      <View style={commonStyles.card}>
        <Text>Total Profit</Text>
        <Text>₹0</Text>
      </View>

      <AppButton
        title="Manage Sites"
        onPress={() => goTo('siteManager')}
      />

      <AppButton
        title="Manage Materials"
        onPress={() => goTo('materialManager')}
      />

      <AppButton
        title="Approve Materials"
        onPress={() => goTo('approvals')}
      />

      <AppButton
        title="Logout"
        type="danger"
        onPress={() => goTo('role')}
      />
    </SafeAreaView>
  );
}
