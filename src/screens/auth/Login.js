import { SafeAreaView} from 'react-native-safe-area-context';
import {View,Text,TextInput } from 'react-native'
import { commonStyles } from '../../styles/common';
import AppButton from '../../components/AppButton';


export default function Login({ setUsername, role, goTo }) {
  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={commonStyles.title}>Login</Text>

        <TextInput
          placeholder="Enter your name"
          style={commonStyles.input}
          onChangeText={setUsername}
        />

        <AppButton
          title="Login"
          onPress={() => {
            if (role === 'manager') goTo('managerDashboard');
            else goTo('supervisorDashboard');
          }}
        />

        <AppButton
          title="Back"
          type="danger"
          onPress={() => goTo('role')}
        />
      </View>
    </SafeAreaView>
  );
}
