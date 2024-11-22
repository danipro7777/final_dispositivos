import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

type LoginProps = {
  onLoginSuccess: () => void;
};

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [nombre, setnombre] = useState('');
  const [contrasena, setcontrasena] = useState('');

  const handleLogin = async () => {
    if (!nombre || !contrasena) {
      Alert.alert('Error', 'Por favor, ingresa un usuario y una contraseña.');
      return;
    }

    try {
      // Supongamos que tienes un endpoint para autenticar al usuario.
      const response = await axios.post('https://r3wfcbvk-8000.use2.devtunnels.ms/login/', {
        nombre,
        contrasena,
      });

      if (response.status === 200) {
        onLoginSuccess(); // Llama a la función que cambia la vista a la principal.
      } else {
        Alert.alert('Error', 'Credenciales incorrectas, intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error en el login:', error);
      Alert.alert('Error', 'No se pudo iniciar sesión. Por favor, intenta de nuevo más tarde.');
    }
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginHeader}>Iniciar Sesión</Text>

      <TextInput
        placeholder="Usuario"
        value={nombre}
        onChangeText={setnombre}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={contrasena}
        onChangeText={setcontrasena}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e0f7fa',
  },
  loginHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00796b',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#00796b',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  loginButton: {
    backgroundColor: '#00796b',
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Login;
