
import { useState } from 'react';
import { commonStyles } from '../../styles/common';
import AppButton from '../../components/AppButton';
import { store, addMaterial } from '../../store/store';
import { SafeAreaView} from 'react-native-safe-area-context';
import { View,Text,TextInput} from 'react-native';

export default function MaterialManager({ goTo }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [shop, setShop] = useState('');

  const handleAdd = () => {
    if (!name || !price || !shop) return;
    addMaterial(name, Number(price), shop);
    setName('');
    setPrice('');
    setShop('');
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <Text style={commonStyles.title}>Manage Materials</Text>

      <TextInput
        style={commonStyles.input}
        placeholder="Material name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={commonStyles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <TextInput
        style={commonStyles.input}
        placeholder="Shop name"
        value={shop}
        onChangeText={setShop}
      />

      <AppButton title="Add Material" onPress={handleAdd} />

      <View style={commonStyles.spacer} />

      {store.materials.map(m => (
        <View key={m.id} style={commonStyles.card}>
          <Text>{m.name}</Text>
          <Text>₹{m.price}</Text>
          <Text>{m.shop}</Text>
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
