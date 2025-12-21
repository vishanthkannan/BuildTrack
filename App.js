import { View, Text, Button, TextInput } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // LOGIN SCREEN
  if (screen === 'login') {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 20,
          backgroundColor: '#f5f5f5'
        }}
      >
        <Text style={{ fontSize: 22, marginBottom: 20, textAlign: 'center' }}>
          Login
        </Text>

        <Text>Username</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Enter username"
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            marginBottom: 15,
            borderRadius: 5,
            backgroundColor: 'white'
          }}
        />

        <Text>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          secureTextEntry
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            marginBottom: 20,
            borderRadius: 5,
            backgroundColor: 'white'
          }}
        />

        <Button
          title="Login"
          onPress={() => {
            // TEMP login logic
            if (username && password) {
              setScreen('dashboard');
            } else {
              alert('Please enter username and password');
            }
          }}
        />
      </View>
    );
  }

  // DASHBOARD
if (screen === 'dashboard') {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: '#f2f2f2'
      }}
    >
      {/* Header */}
      <Text style={{ fontSize: 24, marginBottom: 10 }}>
        Dashboard
      </Text>

      <Text style={{ marginBottom: 20 }}>
        Welcome, {username}
      </Text>

      {/* Card 1 */}
      <View
        style={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 10,
          marginBottom: 15
        }}
      >
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          Sites
        </Text>
        <Text>View and manage construction sites</Text>
        <View style={{ marginTop: 10 }}>
          <Button title="Open Sites" onPress={() => alert('Sites')} />
        </View>
      </View>

      {/* Card 2 */}
      <View
        style={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 10,
          marginBottom: 15
        }}
      >
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          Expenses
        </Text>
        <Text>Add daily expenses and materials</Text>
        <View style={{ marginTop: 10 }}>
          <Button title="Add Expense" onPress={() => alert('Expense')} />
        </View>
      </View>

      {/* Card 3 */}
      <View
        style={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 10,
          marginBottom: 20
        }}
      >
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          Reports
        </Text>
        <Text>View site-wise expense reports</Text>
        <View style={{ marginTop: 10 }}>
          <Button title="View Reports" onPress={() => alert('Reports')} />
        </View>
      </View>

      <Button title="Logout" onPress={() => setScreen('home')} />
    </View>
  );
}


  // HOME SCREEN
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e8f0fe'
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Construction App
      </Text>

      <Button title="Go to Login" onPress={() => setScreen('login')} />
    </View>
  );
}
