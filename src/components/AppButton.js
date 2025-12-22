// src/components/AppButton.js

import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

export default function AppButton({
  title,
  onPress,
  type = 'primary', // primary | danger | success
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === 'danger' && styles.danger,
        type === 'success' && styles.success,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  danger: {
    backgroundColor: colors.danger,
  },
  success: {
    backgroundColor: colors.success,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
