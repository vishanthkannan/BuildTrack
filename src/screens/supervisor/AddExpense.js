import { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';

import { commonStyles } from '../../styles/common';
import AppButton from '../../components/AppButton';
import { store, addExpense } from '../../store/store';
import { getCurrentDateTime } from '../../utils/dateTime';

export default function AddExpense({
  username,
  editingExpense,
  setEditingExpense,
  goTo,
}) {
  /* ---------------- STATE ---------------- */

  const [selectedSiteId, setSelectedSiteId] = useState('');
  const [selectedMaterialId, setSelectedMaterialId] = useState('');
  const [manualMaterial, setManualMaterial] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  /* ---------------- EDIT MODE PREFILL ---------------- */

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
      setPrice(
        editingExpense.isManualMaterial
          ? String(editingExpense.supervisorPrice)
          : ''
      );
      setQuantity(String(editingExpense.quantity));
    }
  }, [editingExpense]);

  /* ---------------- DERIVED DATA ---------------- */

  const isManual = selectedMaterialId === 'OTHER';

  const selectedSite =
    selectedSiteId !== ''
      ? store.sites.find(
          s => s.id === Number(selectedSiteId)
        )
      : null;

  const selectedMaterial =
    !isManual && selectedMaterialId !== ''
      ? store.materials.find(
          m => m.id === Number(selectedMaterialId)
        )
      : null;

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = () => {
    if (!selectedSite) {
      Alert.alert('Error', 'Select a site');
      return;
    }

    if (!quantity || Number(quantity) <= 0) {
      Alert.alert('Error', 'Enter valid quantity');
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
      if (!manualMaterial.trim() || !price) {
        Alert.alert(
          'Error',
          'Enter material name and price'
        );
        return;
      }

      expenseData = {
        ...expenseData,
        materialName: manualMaterial.trim(),
        shop: 'Manual Entry',
        supervisorPrice: Number(price),
        managerPrice: null,
        amount:
          Number(price) * Number(quantity),
        isManualMaterial: true,
      };
    } else {
      if (!selectedMaterial) {
        Alert.alert('Error', 'Select a material');
        return;
      }

      expenseData = {
        ...expenseData,
        materialId: selectedMaterial.id,
        materialName: selectedMaterial.name,
        shop: selectedMaterial.shop,
        supervisorPrice: selectedMaterial.price,
        managerPrice: selectedMaterial.price,
        amount:
          Number(selectedMaterial.price) *
          Number(quantity),
        isManualMaterial: false,
      };
    }

    /* -------- EDIT & RESEND -------- */

    if (editingExpense) {
      editingExpense.siteId = expenseData.siteId;
      editingExpense.siteName = expenseData.siteName;
      editingExpense.materialName =
        expenseData.materialName;
      editingExpense.shop = expenseData.shop;
      editingExpense.quantity = expenseData.quantity;
      editingExpense.amount = expenseData.amount;
      editingExpense.supervisorPrice =
        expenseData.supervisorPrice;
      editingExpense.managerPrice =
        expenseData.managerPrice;
      editingExpense.isManualMaterial =
        expenseData.isManualMaterial;

      editingExpense.status = 'PENDING';
      editingExpense.rejectReason = null;

      setEditingExpense(null);
      goTo('supervisorDashboard');
      return;
    }

    /* -------- NEW ENTRY -------- */

    addExpense(expenseData);
    goTo('supervisorDashboard');
  };

  /* ---------------- UI ---------------- */

  return (
    <SafeAreaView style={commonStyles.container}>
      <Text style={commonStyles.title}>
        {editingExpense
          ? 'Edit Material'
          : 'Add Material'}
      </Text>

      {/* SITE PICKER */}
      <View style={commonStyles.card}>
        <Text>Select Site</Text>
        <Picker
          selectedValue={selectedSiteId}
          onValueChange={setSelectedSiteId}
        >
          <Picker.Item
            label="-- Select Site --"
            value=""
          />
          {store.sites.map(site => (
            <Picker.Item
              key={site.id}
              label={site.name}
              value={String(site.id)}
            />
          ))}
        </Picker>
      </View>

      {/* MATERIAL PICKER */}
      <View style={commonStyles.card}>
        <Text>Select Material</Text>
        <Picker
          selectedValue={selectedMaterialId}
          onValueChange={setSelectedMaterialId}
        >
          <Picker.Item
            label="-- Select Material --"
            value=""
          />
          {store.materials.map(m => (
            <Picker.Item
              key={m.id}
              label={`${m.name} (₹${m.price})`}
              value={String(m.id)}
            />
          ))}
          <Picker.Item
            label="Other (Not in list)"
            value="OTHER"
          />
        </Picker>
      </View>

      {/* MANUAL MATERIAL */}
      {isManual && (
        <View style={commonStyles.card}>
          <TextInput
            style={commonStyles.input}
            placeholder="Material name"
            value={manualMaterial}
            onChangeText={setManualMaterial}
          />
          <TextInput
            style={commonStyles.input}
            placeholder="Price"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />
        </View>
      )}

      {/* AUTO MATERIAL INFO */}
      {selectedMaterial && (
        <View style={commonStyles.card}>
          <Text>
            Shop: {selectedMaterial.shop}
          </Text>
          <Text>
            Price: ₹{selectedMaterial.price}
          </Text>
        </View>
      )}

      {/* QUANTITY */}
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
      <AppButton
        title="Back"
        type="danger"
        onPress={() => {
          setEditingExpense(null);
          goTo('supervisorDashboard');
        }}
      />
    </SafeAreaView>
  );
}
