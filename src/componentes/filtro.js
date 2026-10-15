import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Filtro({ onTipoChange }) {
  const tipos = [
    "All",
    "normal", "fighting", "flying", "poison", "ground", "rock",
    "bug", "ghost", "steel", "fire", "water", "grass", "electric",
    "psychic", "ice", "dragon", "dark", "fairy", "stellar", "shadow",
    "unknown"
  ];

  return (
    <View style={styles.filtroContainer}>
      {tipos.map((unTipo, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => onTipoChange(unTipo)}
        >
          <Text style={styles.buttonText}>{unTipo}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  filtroContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 10,
    padding: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});
