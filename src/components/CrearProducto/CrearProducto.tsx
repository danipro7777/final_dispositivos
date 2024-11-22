import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';

const CrearProducto = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [idCategoria, setIdCategoria] = useState('');
  const [imagenBase64, setImagenBase64] = useState<string | null>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const seleccionarImagen = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          if (asset.uri) {
            setPhotoUri(asset.uri);
          }
          if (asset.base64) {
            setImagenBase64(asset.base64);
          }
        }
      }
    );
  };

  const crearProducto = async () => {
    if (!nombre || !descripcion || !precio || !stock || !idCategoria) {
      Alert.alert('Error', 'Por favor llena todos los campos.');
      return;
    }

    // Verificar los datos antes de enviarlos
    const datosProducto = {
      nombre,
      descripcion,
      precio: parseFloat(precio),
      stock: parseInt(stock),
      id_categoria: parseInt(idCategoria),
      imagen_url: imagenBase64,
    };

    console.log('Datos del producto a enviar:', datosProducto);

    try {
        const response = await axios.post('https://r3wfcbvk-8000.use2.devtunnels.ms/productos/', datosProducto);
      
        if (response.status === 200 || response.status === 201) {
          Alert.alert('Éxito', 'Producto creado con éxito.');
        } else {
          Alert.alert('Error', 'No se pudo crear el producto. Verifica los datos enviados.');
        }
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          console.error('Error al crear el producto:', error.response?.data || error.message);
      
          // Verificar si el error tiene una lista de problemas detallados
          if (error.response?.data?.detail && Array.isArray(error.response.data.detail)) {
            const mensaje = error.response.data.detail.map((item: any) => item.msg).join(', ');
            Alert.alert('Error', mensaje);
          } else {
            Alert.alert('Error', 'No se pudo crear el producto.');
          }
        } else {
          console.error('Error inesperado:', error);
          Alert.alert('Error', 'Ocurrió un error inesperado.');
        }
      }            
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        style={styles.input}
      />
      <TextInput
        placeholder="Precio"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Stock"
        value={stock}
        onChangeText={setStock}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="ID de Categoría"
        value={idCategoria}
        onChangeText={setIdCategoria}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Seleccionar Imagen" onPress={seleccionarImagen} />
      {photoUri && <Image source={{ uri: photoUri }} style={styles.photo} />}
      <Button title="Crear Producto" onPress={crearProducto} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  input: {
    height: 40,
    borderColor: '#000000',
    color: '#000000',
    textShadowColor: '#000000',
    textDecorationColor: '#000000',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  photo: {
    width: 200,
    height: 200,
    marginVertical: 20,
    alignSelf: 'center',
  },
  placeholder: {
    color: '#000000',
    tintColor: '#000000',
  }
});

export default CrearProducto;
