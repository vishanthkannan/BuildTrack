// src/utils/dateTime.js

export function getCurrentDateTime() {
  const now = new Date();

  const date = now.toISOString().split('T')[0]; // YYYY-MM-DD
  const time = now.toTimeString().slice(0, 5);  // HH:MM

  return {
    date,
    time,
  };
}
