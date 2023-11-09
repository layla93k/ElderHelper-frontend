import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Home({ navigation }) {
    return (
      <View style={styles.container}>
      <Text style={styles.text}>Elder Helper</Text>
    </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
        fontSize: 30,
    }
  });
  

