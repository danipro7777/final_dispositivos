import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  ImageBackground,
} from 'react-native';

import Calculadora from './components/Calculadora/calculadora';
import NavegadorWeb from './components/NavegadorWeb/navegadorweb';
import VerFoto from './components/VerFoto/verfoto';
import CrearProducto from './components/CrearProducto/CrearProducto';
import CatalogoProductos from './components/CatalogoProductos/CatalogoProductos';
import ContactPage from './components/ContactPage/ContactPage';
import Login from './components/Login/Login';
import Carrito from './components/Carrito/Carrito';
import Pedidos from './components/Pedidos/Pedidos';

// Define la interfaz para los productos
interface Producto {
  id_producto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  id_categoria: number;
  imagen_url: string | null;
}

const screenWidth = Dimensions.get('window').width;

function Bienvenida(): React.JSX.Element {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>BIENVENIDOS</Text>
      <Text style={styles.title}>INGENIUM</Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const [menuVisible, setMenuVisible] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('Login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState<Producto[]>([]);
  const [pedidos, setPedidos] = useState<Producto[]>([]);
  const [menuAnimation] = useState(new Animated.Value(-screenWidth));

  const toggleMenu = () => {
    const toValue = menuVisible ? -screenWidth : 0;
    Animated.timing(menuAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setMenuVisible(!menuVisible);
  };

  const navigateToScreen = (screenName: string) => {
    setCurrentScreen(screenName);
    toggleMenu();
  };

  const handleAddToCart = (producto: Producto) => {
    setCart([...cart, producto]);
    console.log('Producto añadido al carrito:', producto);
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleComprar = () => {
    setPedidos([...pedidos, ...cart]);
    handleClearCart();
  };

  const renderCurrentScreen = () => {
    if (!isAuthenticated) {
      return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
    }

    switch (currentScreen) {
      case 'Calculadora':
        return <Calculadora />;
      case 'NavegadorWeb':
        return <NavegadorWeb />;
      case 'VerFoto':
        return <VerFoto />;
      case 'CrearProducto':
        return <CrearProducto />;
      case 'CatalogoProductos':
        return <CatalogoProductos onAddToCart={handleAddToCart} />;
      case 'ContactPage':
        return <ContactPage />;
      case 'Carrito':
        return (
          <Carrito
            cart={cart}
            onClearCart={handleClearCart}
            onComprar={handleComprar}
          />
        );
      case 'Pedidos':
        return <Pedidos pedidos={pedidos} />;
      default:
        return <Bienvenida />;
    }
  };

  return (
    <ImageBackground
      source={require('../pictures/fondo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        {isAuthenticated && (
          <View style={styles.header}>
            <TouchableOpacity onPress={toggleMenu}>
              <Text style={styles.menuButton}>☰</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Menu</Text>
          </View>
        )}

        {renderCurrentScreen()}

        {isAuthenticated && (
          <Animated.View
            style={[
              styles.menuContainer,
              { transform: [{ translateX: menuAnimation }] },
            ]}
          >
            <TouchableOpacity onPress={() => navigateToScreen('Bienvenida')}>
              <Text style={styles.menuItem}>Inicio</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToScreen('CatalogoProductos')}>
              <Text style={styles.menuItem}>Catalogo de productos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToScreen('Carrito')}>
              <Text style={styles.menuItem}>Carrito</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToScreen('Pedidos')}>
              <Text style={styles.menuItem}>Mis Pedidos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToScreen('ContactPage')}>
              <Text style={styles.menuItem}>Contactanos</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    height: 50,
    backgroundColor: '#6572a2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    zIndex: 1,
  },
  menuButton: {
    fontSize: 24,
    color: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 45,
    textAlignVertical: 'top',
    color: '#000000',
    fontFamily: 'semi-bold',
  },
  menuContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: screenWidth * 0.75,
    height: '100%',
    backgroundColor: '#6572a2',
    paddingTop: 50,
    paddingLeft: 20,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  menuItem: {
    fontSize: 18,
    marginVertical: 10,
    color: '#e0f7fa',
  },
});

export default App;
