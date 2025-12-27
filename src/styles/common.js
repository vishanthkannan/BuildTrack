// src/styles/common.js

import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const commonStyles = StyleSheet.create({
  /* ---------- Layout ---------- */
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  /* ---------- Text ---------- */
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },

  subtitle: {
    fontSize: 16,
    color: colors.mutedText,
    marginBottom: 8,
  },

  text: {
    fontSize: 14,
    color: colors.text,
  },

  /* ---------- Card ---------- */
  card: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3, // Android shadow
  },

  /* ---------- Input ---------- */
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 14,
  },

  /* ---------- Spacing ---------- */
  spacerSmall: {
    height: 8,
  },

  spacer: {
    height: 16,
  },

  spacerLarge: {
    height: 24,
  },
  
  appHeader: {
  fontSize: 22,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 10,
},

});
