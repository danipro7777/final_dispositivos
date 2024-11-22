import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

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

// Definir el tipo para la función onAddToCart
interface CatalogoProductosProps {
  onAddToCart: (producto: Producto) => void;
}

const CatalogoProductos = ({ onAddToCart }: CatalogoProductosProps) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('https://r3wfcbvk-8000.use2.devtunnels.ms/productos/');
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
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  // Renderizar cada producto en la lista, con tipo `Producto`
  const renderProducto = ({ item }: { item: Producto }) => (
    <View style={styles.productItem}>
      {item.imagen_url ? (
        <Image
          source={{ uri: `data:image/jpeg;base64,${item.imagen_url}` }}
          style={styles.productImage}
        />
      ) : (
        <View style={styles.noImageContainer}>
          <Text style={styles.noImageText}>Sin imagen</Text>
        </View>
      )}
      <Text style={styles.productName}>{item.nombre}</Text>
      <Text style={styles.productDescription}>{item.descripcion}</Text>
      <Text style={styles.productPrice}>Precio: Q.{item.precio}</Text>
      <Text style={styles.productStock}>Stock: {item.stock}</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => onAddToCart(item)}
      >
        <Text style={styles.addButtonText}>Agregar al carrito</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id_producto.toString()}
        renderItem={renderProducto}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

// Estilos para el componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d3e7e',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  productItem: {
    backgroundColor: '#6876aa',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000000',
  },
  productDescription: {
    fontSize: 14,
    marginBottom: 5,
    color: '#000000',
  },
  productPrice: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  productStock: {
    fontSize: 14,
    color: '#333',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 10,
  },
  noImageContainer: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 10,
  },
  noImageText: {
    color: '#888',
    fontSize: 14,
  },
  addButton: {
    marginTop: 10,
    backgroundColor: '#ff7043',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CatalogoProductos;
