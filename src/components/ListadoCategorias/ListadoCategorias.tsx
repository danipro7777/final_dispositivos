import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

// Definir el tipo de las categorías
type Categoria = {
  id_categoria: number;
  nombre: string;
  descripcion: string;
};

const ListadoCategorias = () => {
  // Definir el estado con el tipo correcto
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://192.168.1.37:8000/categorias/');
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id_categoria.toString()}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <Text style={styles.categoryName}>{item.nombre}</Text>
            <Text>Descripción: {item.descripcion}</Text>
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
  categoryItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ListadoCategorias;
