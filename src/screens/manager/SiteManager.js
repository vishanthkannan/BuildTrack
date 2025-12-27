import { useState } from 'react';
import { commonStyles } from '../../styles/common';
import AppButton from '../../components/AppButton';
import { store, addSite } from '../../store/store';
import { SafeAreaView} from 'react-native-safe-area-context';
import { View, Text, TextInput } from 'react-native';

export default function SiteManager({ goTo }) {
  const [siteName, setSiteName] = useState('');

  const handleAdd = () => {
    if (!siteName.trim()) return;
    addSite(siteName.trim());
    setSiteName('');
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <Text style={commonStyles.title}>Manage Sites</Text>

      <TextInput
        style={commonStyles.input}
        placeholder="Enter site name"
        value={siteName}
        onChangeText={setSiteName}
      />

      <AppButton title="Add Site" onPress={handleAdd} />

      <View style={commonStyles.spacer} />

      {store.sites.map(site => (
        <View key={site.id} style={commonStyles.card}>
          <Text>{site.name}</Text>
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
