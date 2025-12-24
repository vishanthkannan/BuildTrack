import { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';

import { commonStyles } from '../../styles/common';
import AppButton from '../../components/AppButton';
import {
  store,
  addExpense,
  addNotification,
} from '../../store/store';
import { getCurrentDateTime } from '../../utils/dateTime';

export default function AddExpense({
  username,
  editingExpense,
  setEditingExpense,
  goTo,
}) {
  const [selectedSiteId, setSelectedSiteId] = useState('');
  const [selectedMaterialId, setSelectedMaterialId] = useState('');
  const [manualMaterial, setManualMaterial] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  /* -------- EDIT MODE PREFILL -------- */
  useEffect(() => {
    if (editingExpense) {
      setSelectedSiteId(String(editingExpense.siteId));
      setSelectedMaterialId(
        editingExpense.isManualMaterial
          ? 'OTHER'
          : String(editingExpense.materialId)
      );
      setManualMaterial(
        editingExpense.isManualMaterial
          ? editingExpense.materialName
          : ''
      );
      setPrice(String(editingExpense.supervisorPrice));
      setQuantity(String(editingExpense.quantity));
    }
  }, [editingExpense]);

  const isManual = selectedMaterialId === 'OTHER';

  const selectedSite =
    selectedSiteId !== ''
      ? store.sites.find(s => s.id === Number(selectedSiteId))
      : null;

  const selectedMaterial =
    !isManual && selectedMaterialId !== ''
      ? store.materials.find(
          m => m.id === Number(selectedMaterialId)
        )
      : null;

  useEffect(() => {
    if (selectedMaterial && !editingExpense) {
      setPrice(String(selectedMaterial.price));
    }
  }, [selectedMaterial]);

  const handleSubmit = () => {
    if (!selectedSite || !quantity || !price) {
      Alert.alert('Error', 'Fill all fields');
      return;
    }

    const { date, time } = getCurrentDateTime();

    let expenseData = {
      supervisor: username,
      siteId: selectedSite.id,
      siteName: selectedSite.name,
      quantity: Number(quantity),
      date,
      time,
    };

    if (isManual) {
      expenseData = {
        ...expenseData,
        materialName: manualMaterial,
        shop: 'Manual Entry',
        supervisorPrice: Number(price),
        managerPrice: null,
        amount: Number(price) * Number(quantity),
        isManualMaterial: true,
      };
    } else {
      expenseData = {
        ...expenseData,
        materialId: selectedMaterial.id,
        materialName: selectedMaterial.name,
        shop: selectedMaterial.shop,
        supervisorPrice: Number(price),
        managerPrice: selectedMaterial.price,
        amount: Number(price) * Number(quantity),
        isManualMaterial: false,
      };
    }

    /* ---- EDIT & RESEND ---- */
    if (editingExpense) {
      Object.assign(editingExpense, expenseData);

      editingExpense.isPriceChanged =
        editingExpense.managerPrice !== null &&
        editingExpense.supervisorPrice !==
          editingExpense.managerPrice;

      editingExpense.priceDifference =
        editingExpense.isPriceChanged
          ? editingExpense.supervisorPrice -
            editingExpense.managerPrice
          : null;

      if (editingExpense.isPriceChanged) {
        addNotification({
          type: 'PRICE_CHANGE',
          message: `⚠ ${username} changed price of ${editingExpense.materialName}`,
          supervisor: username,
          site: editingExpense.siteName,
        });
      }

      editingExpense.status = 'PENDING';
      editingExpense.rejectReason = null;

      setEditingExpense(null);
      goTo('supervisorDashboard');
      return;
    }

    /* ---- NEW ENTRY ---- */
    if (
      expenseData.managerPrice !== null &&
      expenseData.supervisorPrice !== expenseData.managerPrice
    ) {
      addNotification({
        type: 'PRICE_CHANGE',
        message: `⚠ ${username} changed price of ${expenseData.materialName}`,
        supervisor: username,
        site: expenseData.siteName,
      });
    }

    addExpense(expenseData);
    goTo('supervisorDashboard');
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <Text style={commonStyles.title}>
        {editingExpense ? 'Edit Material' : 'Add Material'}
      </Text>

      <View style={commonStyles.card}>
        <Text>Site</Text>
        <Picker selectedValue={selectedSiteId} onValueChange={setSelectedSiteId}>
          <Picker.Item label="Select Site" value="" />
          {store.sites.map(s => (
            <Picker.Item key={s.id} label={s.name} value={String(s.id)} />
          ))}
        </Picker>
      </View>

      <View style={commonStyles.card}>
        <Text>Material</Text>
        <Picker
          selectedValue={selectedMaterialId}
          onValueChange={setSelectedMaterialId}
        >
          <Picker.Item label="Select Material" value="" />
          {store.materials.map(m => (
            <Picker.Item
              key={m.id}
              label={`${m.name} (₹${m.price})`}
              value={String(m.id)}
            />
          ))}
          <Picker.Item label="Other" value="OTHER" />
        </Picker>
      </View>

      {(isManual || selectedMaterial) && (
        <View style={commonStyles.card}>
          {!isManual && (
            <Text>Manager Price: ₹{selectedMaterial.price}</Text>
          )}
          <TextInput
            style={commonStyles.input}
            placeholder="Supervisor Price"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />
        </View>
      )}

      {isManual && (
        <View style={commonStyles.card}>
          <TextInput
            style={commonStyles.input}
            placeholder="Material Name"
            value={manualMaterial}
            onChangeText={setManualMaterial}
          />
        </View>
      )}

      <View style={commonStyles.card}>
        <TextInput
          style={commonStyles.input}
          placeholder="Quantity"
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
        />
      </View>

      <AppButton title="Submit" onPress={handleSubmit} />
      <AppButton title="Back" type="danger" onPress={() => goTo('supervisorDashboard')} />
    </SafeAreaView>
  );
}
