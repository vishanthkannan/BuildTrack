import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import RoleSelect from './src/screens/auth/RoleSelect';
import Login from './src/screens/auth/Login';

import ManagerDashboard from './src/screens/manager/ManagerDashboard';
import SiteManager from './src/screens/manager/SiteManager';
import MaterialManager from './src/screens/manager/MaterialManager';
import Approvals from './src/screens/manager/Approvals';

import SupervisorDashboard from './src/screens/supervisor/SupervisorDashboard';
import AddExpense from './src/screens/supervisor/AddExpense';

export default function App() {
  const [screen, setScreen] = useState('role');
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState('');

  const goTo = (s) => setScreen(s);

  let ScreenComponent = null;

  switch (screen) {
    case 'role':
      ScreenComponent = (
        <RoleSelect setRole={setRole} goTo={goTo} />
      );
      break;

    case 'login':
      ScreenComponent = (
        <Login
          role={role}
          setUsername={setUsername}
          goTo={goTo}
        />
      );
      break;

    case 'managerDashboard':
      ScreenComponent = <ManagerDashboard goTo={goTo} />;
      break;

    case 'siteManager':
      ScreenComponent = <SiteManager goTo={goTo} />;
      break;

    case 'materialManager':
      ScreenComponent = <MaterialManager goTo={goTo} />;
      break;

    case 'approvals':
      ScreenComponent = <Approvals goTo={goTo} />;
      break;

    case 'supervisorDashboard':
      ScreenComponent = (
        <SupervisorDashboard
          username={username}
          goTo={goTo}
        />
      );
      break;

    case 'addExpense':
      ScreenComponent = (
        <AddExpense
          username={username}
          goTo={goTo}
        />
      );
      break;

    default:
      ScreenComponent = null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      {ScreenComponent}
    </SafeAreaProvider>
  );
}
