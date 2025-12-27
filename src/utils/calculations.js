import { store } from '../store/store';

export function getTotalExpense() {
  return store.expenses
    .filter(e => e.status === 'APPROVED')
    .reduce((sum, e) => sum + Number(e.amount), 0);
}

export function getSupervisorExpense(name) {
  return store.expenses
    .filter(
      e =>
        e.status === 'APPROVED' &&
        e.supervisor === name
    )
    .reduce((sum, e) => sum + Number(e.amount), 0);
}
