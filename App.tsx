import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import ClipBoard from 'expo-clipboard';

export default function app() {
  const [password, setPassword] = useState('');
  const [size, setSize] = useState(5);

  function passwordGenerator() {
    const charset = 'abcdefghijklmnopqrstvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%*()';
    let pass = '';

    for(let i = 0, n = charset.length; i < size; i++) {
      pass += charset.charAt(Math.floor(Math.random() * n));
    }

    setPassword(() => pass)
  }

  function copyPassword() {
    ClipBoard.setString(password);
    alert('Password copied with successfully!');
  }

  return (
    <View style = {styles.container}>
      <Image 
      source = {require('./assets/logo.png')}
      style = {styles.logo}
      />


    <Text style={styles.title}>{size} caracteres</Text>

    <View style={styles.area}>
      <Slider
      style = {{height: 50}}
      maximumValue = {15}
      minimumValue = {5}
      minimumTrackTintColor = '#FF0000'
      maximumTrackTintColor = '#000'
      value = {size}
      onValueChange = {(newValue) => setSize(parseInt(newValue.toFixed(0)))}
      />
    </View>

    <TouchableOpacity 
    style = {styles.button}
    onPress = {passwordGenerator}
    >
        <Text style = {styles.buttonText}>Generate Password</Text>
    </TouchableOpacity>

    {password !== '' && (
      <View style={styles.area}>
        <Text 
        style = {styles.password}
        onLongPress = {copyPassword}
        >{password}</Text>
      </View>
    )}
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F3FF',
  },
  logo: {
    marginBottom: 60
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  area: {
    marginBottom: 15,
    marginTop: 15,
    backgroundColor: '#FFF',
    width: '90%',
    borderRadius: 7
  },
  button: {
    backgroundColor: '#FFA200',
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    marginBottom: 25
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF'
  },
  password: {
    padding: 10,
    color: '#000',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  }
});