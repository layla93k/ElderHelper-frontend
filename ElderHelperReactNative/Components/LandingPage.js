
import { StyleSheet, View, Button, ImageBackground } from "react-native";


export default function LandingPage({ navigation }) {

    return (
      <View style={styles.landingContainer}>
        <ImageBackground source={require(`../assets/Logo.png`)} resizeMode="cover" style={styles.image}/>
            <View style={styles.buttonContainer}>
                <Button color="#08495d" title="  Login  " onPress={() => { navigation.navigate('Login') }}/>
                <Button color="#08495d" title="Sign Up" onPress={() => { navigation.navigate('SignUp') }}/>
            </View>
        <ImageBackground/>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    landingContainer: {
      flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#b3e3e3',
        paddingBottom: 40,
    },
  })
