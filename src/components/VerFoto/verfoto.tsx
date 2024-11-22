import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Alert } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import axios from 'axios';

const VerFoto = () => {
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const takePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          const uri = asset.uri;
          if (uri) {
            setPhotoUri(uri);
          } else {
            console.log('URI no encontrado en la respuesta');
            Alert.alert('Error', 'No se pudo obtener la URI de la foto');
          }
        }
      }
    );
  };
  

  const uploadPhoto = async () => {
    if (!photoUri) {
      Alert.alert('Error', 'Primero toma una foto');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: photoUri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });
  
      const response = await axios.post('http://192.168.1.37:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      Alert.alert('Éxito', 'La foto se ha enviado correctamente');
    } catch (error) {
      console.error('Error uploading photo:', error);
      Alert.alert('Error', 'No se pudo enviar la foto');
    }
  };
  

  return (
    <View style={styles.container}>
      <Button title="Tomar Foto" onPress={takePhoto} />
      {photoUri && <Image source={{ uri: photoUri }} style={styles.photo} />}
      <Button title="Enviar Foto" onPress={uploadPhoto} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
});

export default VerFoto;
