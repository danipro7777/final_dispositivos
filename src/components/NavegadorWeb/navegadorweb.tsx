import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const NavegadorWeb = () => {
  return (
    <View style={styles.container}>
      <WebView 
        source={{ uri: 'https://www.google.com' }} 
        style={{ flex: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default NavegadorWeb;
