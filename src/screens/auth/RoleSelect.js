// src/screens/auth/RoleSelect.js

import { commonStyles } from '../../styles/common';
import AppButton from '../../components/AppButton';
import { SafeAreaView} from 'react-native-safe-area-context';
import { View, Text } from 'react-native';

export default function RoleSelect({ setRole, goTo }) {
  return (
    <SafeAreaView style={commonStyles.center}>
      <Text style={commonStyles.title}>Select Role</Text>

      <View style={{ width: '80%' }}>
        <AppButton
          title="Manager"
          onPress={() => {
            setRole('manager');
            goTo('login');
          }}
        />

        <AppButton
          title="Supervisor"
          onPress={() => {
            setRole('supervisor');
            goTo('login');
          }}
        />
      </View>
    </SafeAreaView>
  );
}
