import React from 'react';
import { View, StyleSheet } from 'react-native';
import Menu from '../components/Menu';
import ShelterList from '../components/ShelterList';
import {
  SafeAreaView
} from 'react-native-safe-area-context';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ShelterList />
      </View>

      <View style={styles.menu}>
        <Menu />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingBottom: 70,
  },
  menu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
  },
});
