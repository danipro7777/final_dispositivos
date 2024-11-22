import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';

// Definir el tipo del producto
type Producto = {
  id_producto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen_base64?: string; // Añadir el campo para la imagen en Base64
};

const ListadoProductos = () => {
  // Define el estado con el tipo correcto
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://192.168.1.37:8000/productos/');
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id_producto.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            {item.imagen_base64 && (
              <Image
                source={{ uri: `data:image/jpeg;base64,${item.imagen_base64}` }}
                style={styles.productImage}
              />
            )}
            <Text style={styles.productName}>{item.nombre}</Text>
            <Text>Descripción: {item.descripcion}</Text>
            <Text>Precio: ${item.precio}</Text>
            <Text>Stock: {item.stock}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  productItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  productImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
    alignSelf: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ListadoProductos;
