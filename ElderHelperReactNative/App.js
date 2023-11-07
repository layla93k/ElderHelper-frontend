import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JobsMap from './JobsMap';
import SingleJob from './SingleJob';


function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
    <Text>Open up App.js to start working on your app!</Text>
    <Button title='JobsMap' onPress={() => navigation.navigate('JobsMap')} />
    <StatusBar style="auto" />
  </View>
  )
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="JobsMap" component={JobsMap} />
        <Stack.Screen name="SingleJob" component={SingleJob} />
      </Stack.Navigator> 
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
