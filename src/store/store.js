// src/store/store.js

// ---- INITIAL DATA ---- //

export const store = {
  // Manager-created sites
  sites: [
    { id: 1, name: 'Salem' },
    { id: 2, name: 'Erode' },
  ],

  // Manager-created materials (master list)
  materials: [
    { id: 1, name: 'Cement', price: 400, shop: 'ABC Traders' },
    { id: 2, name: 'Steel', price: 60, shop: 'XYZ Steels' },
  ],

  // Supervisor-submitted expenses
  expenses: [],
};

// ---- STORE ACTIONS ---- //

// Add new site (Manager only)
export function addSite(name) {
  store.sites.push({
    id: Date.now(),
    name,
  });
}

// Add new material (Manager only)
export function addMaterial(name, price, shop) {
  store.materials.push({
    id: Date.now(),
    name,
    price,
    shop,
  });
}

// Add expense (Supervisor)
export function addExpense(expense) {
  store.expenses.push({
    id: Date.now(),
    ...expense,
    status: 'PENDING', // default
  });
}

// Approve expense (Manager)
export function approveExpense(id) {
  const expense = store.expenses.find(e => e.id === id);
  if (expense) {
    expense.status = 'APPROVED';
  }
}

// Reject expense (Manager)
export function rejectExpense(id) {
  const expense = store.expenses.find(e => e.id === id);
  if (expense) {
    expense.status = 'REJECTED';
  }
}

// Get approved expenses (used for totals & reports)
export function getApprovedExpenses() {
  return store.expenses.filter(e => e.status === 'APPROVED');
}

