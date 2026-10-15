import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    // Cargar favoritos al iniciar
    const cargarFavoritos = async () => {
      try {
        const datos = await AsyncStorage.getItem('favoritos');
        if (datos) {
          setFavoritos(JSON.parse(datos));
        }
      } catch (error) {
        console.log('Error al cargar favoritos', error);
      }
    };
    cargarFavoritos();
  }, []);

  useEffect(() => {
    // Guardar favoritos cuando cambien
    const guardarFavoritos = async () => {
      try {
        await AsyncStorage.setItem('favoritos', JSON.stringify(favoritos));
      } catch (error) {
        console.log('Error al guardar favoritos', error);
      }
    };
    guardarFavoritos();
  }, [favoritos]);

  return (
    <AppContext.Provider value={{ favoritos, setFavoritos }}>
      {children}
    </AppContext.Provider>
  );
}
