import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const CrearVenta = () => {
  const [idUsuario, setIdUsuario] = useState('');
  const [productos, setProductos] = useState('');

  const crearVenta = async () => {
    if (!idUsuario || !productos) {
      Alert.alert('Error', 'Por favor llena todos los campos.');
      return;
    }

    try {
      const parsedProductos = JSON.parse(productos);

      const response = await axios.post('http://192.168.1.37:8000/ventas/', {
        id_usuario: parseInt(idUsuario),
        productos: parsedProductos,  // Ejemplo: [{"id_producto": 1, "cantidad": 2}]
      });

      Alert.alert('Éxito', 'Venta realizada con éxito.');
    } catch (error) {
      console.error('Error al crear la venta:', error);
      Alert.alert('Error', 'No se pudo realizar la venta.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="ID de Usuario"
        value={idUsuario}
        onChangeText={setIdUsuario}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Productos (JSON)"
        value={productos}
        onChangeText={setProductos}
        style={styles.input}
      />
      <Button title="Crear Venta" onPress={crearVenta} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default CrearVenta;
