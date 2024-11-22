import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';

// Definir la interfaz para el tipo de datos del producto
interface Producto {
  id_producto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  id_categoria: number;
  imagen_url: string | null;
}

interface CarritoProps {
  cart: Producto[];
  onClearCart: () => void;
  onComprar: () => void;
}

const Carrito = ({ cart, onClearCart, onComprar }: CarritoProps) => {
  const [cantidadCompra, setCantidadCompra] = useState<string>('');

  const handleComprar = () => {
    const totalCarrito = cart.reduce((total, producto) => total + producto.precio, 0);
    if (parseFloat(cantidadCompra) !== totalCarrito) {
      Alert.alert('Error', 'La cantidad ingresada no coincide con el total de la compra.');
      return;
    }

    Alert.alert('Compra realizada', '¡Tu compra se ha realizado con éxito!');
    setCantidadCompra('');
    onComprar(); // Llamar a la función para mover los productos a pedidos
  };

  const renderProducto = ({ item }: { item: Producto }) => (
    <View style={styles.productItem}>
      <Text style={styles.productName}>{item.nombre}</Text>
      <Text style={styles.productPrice}>Precio: Q.{item.precio}</Text>
      <Text style={styles.productQuantity}>Cantidad: 1</Text>
    </View>
  );

  const totalCarrito = cart.reduce((total, producto) => total + producto.precio, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id_producto.toString()}
        renderItem={renderProducto}
        contentContainerStyle={styles.list}
      />
      <Text style={styles.totalText}>Total: Q.{totalCarrito.toFixed(2)}</Text>
      <TextInput
        style={styles.input}
        value={cantidadCompra}
        onChangeText={setCantidadCompra}
        placeholder="Ingresa la cantidad total de la compra"
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.buyButton} onPress={handleComprar}>
        <Text style={styles.buyButtonText}>Comprar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.clearButton} onPress={onClearCart}>
        <Text style={styles.clearButtonText}>Vaciar Carrito</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e6e6e6',
  },
  list: {
    paddingBottom: 20,
  },
  productItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
  },
  productQuantity: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#333',
  },
  buyButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  clearButton: {
    backgroundColor: '#ff7043',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
});

export default Carrito;
