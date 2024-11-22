import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';

const ContactPage = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const enviarMensaje = () => {
    if (!nombre || !email || !mensaje) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    // Aquí podrías hacer el envío del mensaje a tu API
    Alert.alert('¡Gracias!', 'Tu mensaje ha sido enviado correctamente.');
    setNombre('');
    setEmail('');
    setMensaje('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contáctanos</Text>
      <Text style={styles.subHeader}>Nos encantaría saber de ti. Completa el formulario a continuación:</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Mensaje"
          value={mensaje}
          onChangeText={setMensaje}
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={enviarMensaje}>
        <Text style={styles.buttonText}>Enviar Mensaje</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    color: '#333',
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#6200ee',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    color: '#333',
  }
});

export default ContactPage;
