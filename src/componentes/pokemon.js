import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { AppContext } from '../context/AppContext';

export default function Pokemon({ route }) {
  const { nombre } = route.params; // Obtener el nombre del Pokémon desde los parámetros
  const [pokemon, setPokemon] = useState(null);
  const { favoritos, setFavoritos } = useContext(AppContext);

  const esFavorito = favoritos.some(p => p.id === pokemon?.id);

  const toggleFavorito = () => {
    if (!pokemon) return;
    if (esFavorito) {
      setFavoritos(favoritos.filter(p => p.id !== pokemon.id));
    } else {
      setFavoritos([...favoritos, { id: pokemon.id, nombre: pokemon.name }]);
    }
  };

  useEffect(() => {
    const obtenerPokemon = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
      const data = await res.json();
      setPokemon(data);
    };
    obtenerPokemon();
  }, [nombre]);

  if (!pokemon) return <Text>Cargando...</Text>;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.titulo}>{pokemon.name}</Text>
        <Image
          source={{
            uri: pokemon.sprites.other['official-artwork'].front_default
          }}
          style={styles.imagen}
        />
        <Text>Tipo(s): {pokemon.types.map(t => t.type.name).join(', ')}</Text>
        <Text>Altura: {pokemon.height / 10} m / Peso: {pokemon.weight / 10} kg</Text>
        <TouchableOpacity onPress={toggleFavorito} style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 32 }}>{esFavorito ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imagen: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
});
