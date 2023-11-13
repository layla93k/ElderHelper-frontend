import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  View,
  TouchableHighlight,
  Alert,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";
import { useContext } from "react";
import { CurrentUser } from "../UserContext";
import { useNavigation } from "@react-navigation/native";
import { getExistingUser } from "../api";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Login() {
  const navigation = useNavigation();

  const [numberLogin, onChangeNumberLogin] = React.useState("");
  const [passwordLogin, onChangePasswordLogin] = React.useState("");
  const [userDoesNotExist, setUserDoesNotExist] = React.useState(false);

  const validate = () => {
    if (!numberLogin || !passwordLogin) {
      Alert.alert("All fields are required");
      return;
    }
  };

  const { userId, setUserId } = useContext(CurrentUser);

  const handleLogin = () => {
    console.log("axios sent");
    getExistingUser(numberLogin)
      .then(({ user }) => {
        setUserId(user);
        setUserDoesNotExist(false);
        Alert.alert(
          "Successfully logged in",
          `Welcome back ${user.first_name}!`,
          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("Home");
              },
            },
          ]
        );
      })
      .catch((err) => {
        setUserDoesNotExist(true);
        console.log("user does not exist");
      });
  };

  const handleSignUpLinkPress = () => {
    navigation.navigate("SignUp");
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#9DD8E7", height: "100%" }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 50,
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: 40,
            fontWeight: "bold",
            marginTop: 140,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Log in
        </Text>

        <View>
          <Text style={style.label}>Phone Number</Text>
          <View style={[style.inputContainer]}>
            <Ionicons style={style.icon} name="person-outline" size={24} />
            <TextInput
              style={style.input}
              keyboardType="numeric"
              onChangeText={onChangeNumberLogin}
              value={numberLogin}
            />
          </View>
        </View>
        <Text style={style.userDoesntExist}>
          {userDoesNotExist ? "User does not exist" : ""}
        </Text>
        <View>
          <Text style={style.label}>Password</Text>
          <View style={[style.inputContainer]}>
            <AntDesign
              style={style.icon}
              name="lock1"
              size={24}
              color="black"
            />
            <TextInput
              secureTextEntry={true}
              style={style.input}
              onChangeText={onChangePasswordLogin}
              value={passwordLogin}
            />
          </View>
        </View>
        <View>
          <Text style={style.signuplink}>
            If you do not have a login, click{" "}
            <TouchableOpacity
              style={style.highlight}
              onPress={handleSignUpLinkPress}
            >
              <Text style={style.highlight}>here</Text>
            </TouchableOpacity>
          </Text>
        </View>
        <View>
          <Pressable
            style={style.button}
            onPress={() => {
              validate();
              handleLogin();
            }}
          >
            <Text style={style.text}> Log in</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

{
}

const style = StyleSheet.create({
  // text: {
  //   flex: 1,
  //   fontSize: 30,
  //   color: "#FFFFFF",
  //   textAlign: "center",
  //   marginTop: 30,
  // },
  signuplink: {
    marginLeft: 15,
    marginBottom: 10,
  },
  highlight: {
    fontWeight: "bold",
  },
  label: {
    marginVertical: 5,
    fontSize: 14,
  },
  userDoesntExist: {
    color: "red",
    marginBottom: 10,
  },
  inputContainer: {
    height: 60,
    marginBottom: 10,
    backgroundColor: "#D6EAEE",
    flexDirection: "row",
    marginHorizontal: 15,
    borderWidth: 0.5,
    alignItems: "center",
  },
  icon: {
    marginLeft: 10,
    color: "#C0C0C0",
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    padding: 15,
  },
  button: {
    padding: 5,
    marginTop: 10,
    borderRadius: 10,
    padding: 5,
    backgroundColor: "#0072BB",
    width: 180,
    height: 60,
    flex: "row",
    alignSelf: "center",
  },
  text: {
    justifyContent: "center",
    textAlign: "center",
    paddingTop: 10,
    fontSize: 22,
    color: "white",
  },
});
