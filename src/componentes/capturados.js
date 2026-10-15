import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Capturados() {
  const totalPokes = 1025;
  const [listaCapturados, setListaCapturados] = useState([]);
  const [pokemones, setPokemones] = useState([]);
  const [nuevos, setNuevos] = useState([]);
  const navigation = useNavigation();

  const espacio = Array.from({ length: totalPokes }, (_, i) => i + 1);

  useEffect(() => {
    const cargarCapturados = async () => {
      try {
        const guardados = await AsyncStorage.getItem('misNumeros');
        if (guardados) {
          const parsed = JSON.parse(guardados);
          if (Array.isArray(parsed)) {
            setListaCapturados([...new Set(parsed.map(Number))]);
          }
        }
      } catch (error) {
        console.error('Error al cargar capturados:', error);
      }
    };
    cargarCapturados();
  }, []);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1025')
      .then((respuesta) => respuesta.json())
      .then((datos) => setPokemones(datos.results))
      .catch((error) => console.error('Error al cargar Pokémon:', error));
  }, []);

  const capturarAleatorios = async () => {
    const seleccionados = Array.from(
      { length: 4 },
      () => Math.floor(Math.random() * totalPokes) + 1
    );
    const vistos = new Set(listaCapturados);
    const resultados = seleccionados.map((id) => {
      const repetido = vistos.has(id);
      vistos.add(id);
      return { id, repetido };
    });
    const actualizados = [...vistos];

    setListaCapturados(actualizados);
    setNuevos(resultados);

    try {
      await AsyncStorage.setItem('misNumeros', JSON.stringify(actualizados));
    } catch (error) {
      console.error('Error al guardar capturados:', error);
    }
  };

  const irADetalle = (id) => {
    const nombre = pokemones[id - 1]?.name || String(id);
    navigation.navigate('Pokemon', { nombre });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.titulo}>Colección</Text>
        <Text style={styles.contador}>
          {listaCapturados.length} <Text style={styles.contadorSpan}>/ {totalPokes}</Text>
        </Text>

        <TouchableOpacity
          style={[
            styles.boton,
            listaCapturados.length >= totalPokes && styles.botonDeshabilitado,
          ]}
          onPress={capturarAleatorios}
          disabled={listaCapturados.length >= totalPokes}
        >
          <Text style={styles.botonTexto}>4 nuevos</Text>
        </TouchableOpacity>

        {nuevos.length > 0 && (
          <>
            <Text style={styles.subtitulo}>Tus nuevos Pokémon</Text>
            <View style={styles.nuevosContainer}>
              {nuevos.map(({ id, repetido }, indice) => (
                <TouchableOpacity
                  key={`${id}-${indice}`}
                  style={[styles.nuevoCard, repetido && styles.nuevoRepetido]}
                  onPress={() => irADetalle(id)}
                >
                  <Text style={styles.nuevoId}>{id}</Text>
                  <Image
                    source={{
                      uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
                    }}
                    style={styles.nuevoImagen}
                  />
                  <Text numberOfLines={1} style={styles.nuevoNombre}>
                    {pokemones[id - 1]?.name || ''}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        <Text style={styles.subtituloAlbum}>Álbum</Text>
        <View style={styles.albumGrid}>
          {espacio.map((id) => {
            const capturado = listaCapturados.includes(id);
            return (
              <TouchableOpacity
                key={id}
                style={[styles.albumItem, capturado ? styles.capturado : styles.noCapturado]}
                onPress={() => capturado && irADetalle(id)}
                disabled={!capturado}
              >
                {capturado && (
                  <Image
                    source={{
                      uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
                    }}
                    style={styles.albumImagen}
                  />
                )}
                <Text style={styles.albumId}>{id}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 15,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
  },
  contador: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#007bff',
  },
  contadorSpan: {
    color: '#777',
    fontSize: 16,
  },
  boton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 20,
  },
  botonDeshabilitado: {
    backgroundColor: '#ccc',
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#444',
  },
  nuevosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  nuevoCard: {
    width: '23%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#28a745',
  },
  nuevoRepetido: {
    borderColor: '#ffc107',
    backgroundColor: '#fffdf0',
  },
  nuevoId: {
    fontSize: 12,
    color: '#666',
  },
  nuevoImagen: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  nuevoNombre: {
    fontSize: 11,
    textAlign: 'center',
    color: '#333',
    marginTop: 4,
  },
  subtituloAlbum: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#444',
  },
  albumGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 6,
    paddingBottom: 30,
  },
  albumItem: {
    width: '18%',
    height: 65,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  capturado: {
    backgroundColor: '#e8f5e9',
    borderColor: '#81c784',
    borderWidth: 1,
  },
  noCapturado: {
    backgroundColor: '#eeeeee',
  },
  albumImagen: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  albumId: {
    fontSize: 10,
    color: '#555',
  },
});