import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Pressable,
} from "react-native";

export default function LandingPage({ navigation }) {
  return (
    <View style={styles.landingContainer}>
      <ImageBackground
        source={require(`../assets/Logo.png`)}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.buttontext}>Login</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={styles.buttontext}>Sign up</Text>
        </Pressable>
      </View>
      <ImageBackground />
    </View>
  );
}

const styles = StyleSheet.create({
  landingContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#b3e3e3",
    paddingBottom: 40,
  },

  button: {
    padding: 3,
    marginTop: 10,
    borderRadius: 10,
    padding: 5,
    backgroundColor: "#08495d",
    width: 100,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    elevation: 5,
  },

  buttontext: {
    fontSize: 20,
    textAlign: "center",
    paddingTop: 6,
    color: "#ede7d7",
  },
});
