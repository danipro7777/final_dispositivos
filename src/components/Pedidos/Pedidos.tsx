import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

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

interface PedidosProps {
  pedidos: Producto[];
}

const Pedidos = ({ pedidos }: PedidosProps) => {
  const renderPedido = ({ item }: { item: Producto }) => (
    <View style={styles.pedidoItem}>
      <Text style={styles.productName}>{item.nombre}</Text>
      <Text style={styles.productPrice}>Precio: Q.{item.precio}</Text>
      <Text style={styles.status}>Estado: <Text style={styles.statusEnviado}>Enviado</Text></Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tus Pedidos</Text>
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id_producto.toString()}
        renderItem={renderPedido}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e6e6e6',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  list: {
    paddingBottom: 20,
  },
  pedidoItem: {
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
  status: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  statusEnviado: {
    color: 'green',
    fontWeight: 'bold',
  },
});

export default Pedidos;