import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Alert,
  useColorScheme,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen'; 

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');

  const handleSum = () => {
    const sum = parseFloat(num1) + parseFloat(num2);
    Alert.alert('Resultado', `La suma es: ${sum}`);
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const operacionResta = () => {
    const difference = parseFloat(num1) - parseFloat(num2);
    Alert.alert('Resultado', `La resta es: ${difference}`);
  };

  const operacionMultiplicacion = () => {
    const multi = parseFloat(num1) * parseFloat(num2);
    Alert.alert('Resultado', `La multiplicación es: ${multi}`);
  };

  const operacionDivision = () => {
    const division = parseFloat(num1) / parseFloat(num2);
    Alert.alert('Resultado', `La división es: ${division}`);
  };

  return (
    <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            padding: 16,
          }}>
          <Text style={styles.title}>Calculadora</Text>
          <TextInput
            style={styles.input}
            placeholder="Número 1"
            keyboardType="numeric"
            value={num1}
            onChangeText={setNum1}
          />
          <TextInput
            style={styles.input}
            placeholder="Número 2"
            keyboardType="numeric"
            value={num2}
            onChangeText={setNum2}
          />
          <Button title="Suma" onPress={handleSum} />
          <View style={{ marginVertical: 10 }} />
          <Button title="Resta" onPress={operacionResta} />
          <View style={{ marginVertical: 10 }} />
          <Button title="Multiplicación" onPress={operacionMultiplicacion} />
          <View style={{ marginVertical: 10 }} />
          <Button title="División" onPress={operacionDivision} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});

export default App;
