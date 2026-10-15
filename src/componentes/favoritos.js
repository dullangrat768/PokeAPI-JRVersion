import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppContext } from '../context/AppContext';
import { useNavigation } from '@react-navigation/native';

export default function Favoritos() {
  const { favoritos } = useContext(AppContext);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.titulo}>Favoritos</Text>
        {favoritos.length === 0 ? (
          <Text style={styles.vacio}>No hay Pokémon favoritos aún.</Text>
        ) : (
          <View style={styles.lista}>
            {favoritos.map((pokemon, index) => (
              <TouchableOpacity
                key={index}
                style={styles.pokemonItem}
                onPress={() => navigation.navigate('Pokemon', { nombre: pokemon.nombre })}
              >
                <Image
                  source={{
                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
                  }}
                  style={styles.imagen}
                />
                <Text style={styles.pokemonNombre}>{pokemon.nombre}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  vacio: {
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
  lista: {
    marginTop: 10,
  },
  pokemonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  imagen: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 15,
  },
  pokemonNombre: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});