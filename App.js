import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Informativa from './src/componentes/informativa';
import Capturados from './src/componentes/capturados';
import Favoritos from './src/componentes/favoritos';
import Lista from './src/componentes/lista';
import Usuario from './src/componentes/usuario';
import Pokemon from './src/componentes/pokemon';
import { AppProvider } from './src/context/AppContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ListaStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Explorar" component={Lista} />
      <Stack.Screen name="Pokemon" component={Pokemon} options={{ headerShown: true, title: 'Detalle' }} />
    </Stack.Navigator>
  );
}

function FavoritosStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FavoritosMain" component={Favoritos} />
      <Stack.Screen name="Pokemon" component={Pokemon} options={{ headerShown: true, title: 'Detalle' }} />
    </Stack.Navigator>
  );
}

function CapturadosStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CapturadosMain" component={Capturados} />
      <Stack.Screen name="Pokemon" component={Pokemon} options={{ headerShown: true, title: 'Detalle' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Lista" component={ListaStack} />
          <Tab.Screen name="Informativa" component={Informativa} />
          <Tab.Screen name="Capturados" component={CapturadosStack} />
          <Tab.Screen name="Favoritos" component={FavoritosStack} />
          <Tab.Screen name="Usuario" component={Usuario} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}