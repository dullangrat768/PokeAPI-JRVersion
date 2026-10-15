import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Linking, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Informativa() {
  const fondoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG1kimk6GBcp1v9043N4rivoqYlrQ6gnTHw1L28zrA3Q&s=10";
  const urlGithub = "https://github.com/dullangrat768";

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground 
        source={{ uri: fondoUrl }} 
        style={styles.container}
        imageStyle={styles.bgImage}
      >
        <View style={styles.card}>
          <Text style={styles.title}>POKE API</Text>
          <Text style={styles.author}>Jhan Sebastián Rivera</Text>

          <View style={styles.logoPlaceholder}>
            <Image 
              source={{ uri: "https://raw.githubusercontent.com/dullangrat768/PokeAPI-webview-version/refs/heads/main/Pokemon-Icono.png" }}
              alt="PokeAPI Logo" 
              style={styles.logoImg}
              resizeMode="contain"
            />
          </View>

          {/* Cuadro de descripción */}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Api con información de 1025 pokemones</Text>
          </View>

          {/* Enlace a GitHub y Versión */}
          <View style={styles.footer}>
            <TouchableOpacity onPress={() => Linking.openURL(urlGithub)}>
              <Text style={styles.githubLink}>github.com/dullangrat768</Text>
            </TouchableOpacity>
            <Text style={styles.version}>v 1.0.0</Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  bgImage: {
    opacity: 0.25,
  },
  card: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 16,
    paddingVertical: 40,
    paddingHorizontal: 25,
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#f8fafc',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 6,
  },
  author: {
    fontSize: 17,
    color: '#94a3b8',
    fontWeight: '500',
    marginBottom: 15,
  },
  logoPlaceholder: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: '#6366f1',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.85)',
    marginVertical: 10,
    overflow: 'hidden',
  },
  logoImg: {
    width: '80%',
    height: '80%',
  },
  badge: {
    backgroundColor: 'rgba(30, 41, 59, 0.85)',
    borderWidth: 1,
    borderColor: '#6366f1',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: '100%',
    marginVertical: 15,
  },
  badgeText: {
    color: '#f8fafc',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    marginTop: 10,
    gap: 6,
  },
  githubLink: {
    color: '#6366f1',
    fontWeight: '600',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  version: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 4,
  },
});