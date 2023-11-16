import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Alert,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { manchesterPostcodes } from "../postcodes";
import { postNewUser } from "../api";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function App({ navigation }) {
  const [firstName, onChangeFirstName] = React.useState("");
  const [surname, onChangeSurname] = React.useState("");
  const [postcode, onChangePostcode] = React.useState("");
  const [phoneNumber, onChangePhoneNumber] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [confirmPassword, onChangeConfirmPassword] = React.useState("");
  const [userType, setUserType] = React.useState("");
  const [passwordMsg, setPasswordMsg] = React.useState("");
  const [newUser, setNewUser] = React.useState({
    phone_number: phoneNumber,
    first_name: firstName,
    surname: surname,
    is_elder: userType,
    postcode: postcode,
    avatar_url: "",
  });

  const validate = () => {
    if (
      !firstName ||
      !surname ||
      !phoneNumber ||
      !postcode ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Your passwords do not match");
      return;
    }
    if (password.length < 7) {
      setPasswordMsg("Password must contain at least 7 characters");
    }
  };
  const handleSignup = () => {
    postNewUser(newUser)
      .then((response) => {
        if (password.length > 7) {
          Alert.alert(
            "Registration successful!",
            `Welcome to Elder Helper ${newUser.first_name}!`
          );
          navigation.navigate("Login");
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    setNewUser({
      phone_number: phoneNumber,
      first_name: firstName,
      surname: surname,
      is_elder: userType,
      postcode: postcode,
      avatar_url:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    });
  }, [firstName, surname, postcode, phoneNumber, userType]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
    >
      <SafeAreaView style={{ backgroundColor: "#EDE7D7", flex: 0 }}>
        <ScrollView
          contentContainerStyle={{
            paddingTop: 50,
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ color: "#08495d", fontSize: 40, fontWeight: "bold" }}>
            Sign Up
          </Text>
          <Text
            style={{
              fontSize: 20,
              lineHeight: 35,
              marginBottom: 25,
              color: "#08495d"
            }}
          >
            Enter your details to register
          </Text>
          <View>
            <Text style={style.label}>First Name</Text>
            <View style={[style.inputContainer]}>
              <Ionicons style={style.icon} name="person-outline" size={24} />
              <TextInput
                style={style.input}
                onChangeText={onChangeFirstName}
                value={firstName}
              />
            </View>
          </View>
          <View>
            <Text style={style.label}>Surname</Text>
            <View style={[style.inputContainer]}>
              <Ionicons
                style={style.icon}
                name="person-outline"
                size={24}
                color="black"
              />
              <TextInput
                style={style.input}
                onChangeText={onChangeSurname}
                value={surname}
              />
            </View>
          </View>
          <View>
            <Text style={style.title}>Select your account type:</Text>
            <View style={style.fixToText}>
              <Pressable
                style={style.userbutton}
                onPress={() => {
                  Alert.alert("You have chosen an Elder account");
                  setUserType(true);
                }}
              >
                <Text style={style.buttontext}>Elder</Text>
              </Pressable>
              <Pressable
                style={style.userbutton}
                onPress={() => {
                  Alert.alert("You have chosen a Helper account");
                  setUserType(false);
                }}
              >
                <Text style={style.buttontext}>Helper</Text>
              </Pressable>
            </View>
          </View>
          <View>
            <Text style={style.label}>Phone number</Text>
            <View style={[style.inputContainer]}>
              <Feather
                style={style.icon}
                name="phone"
                size={24}
                color="black"
              />
              <TextInput
                keyboardType="numeric"
                style={style.input}
                onChangeText={onChangePhoneNumber}
                value={phoneNumber}
              />
            </View>
            <View>
              <Text style={style.label}>Choose your postcode area</Text>
            </View>
            <View style={style.pickerContainer}>
              <RNPickerSelect
              style={style.label}
                onValueChange={(value) => onChangePostcode(value)}
                items={manchesterPostcodes}
              />
            </View>
            <View>
              <Text style={style.label}>Password</Text>
              <View style={[style.inputContainer]}>
                <MaterialCommunityIcons
                  style={style.icon}
                  name="onepassword"
                  size={24}
                  color="black"
                />

                <TextInput
                  secureTextEntry={true}
                  style={style.input}
                  onChangeText={onChangePassword}
                  value={password}
                />
              </View>
              <Text style={StyleSheet.passwordMessage}>{passwordMsg}</Text>
              <View>
                <Text style={style.label}>Confirm Password</Text>
                <View style={[style.inputContainer]}>
                  <MaterialCommunityIcons
                    style={style.icon}
                    name="onepassword"
                    size={24}
                    color="black"
                  />
                  <TextInput
                    secureTextEntry={true}
                    style={style.input}
                    onChangeText={onChangeConfirmPassword}
                    value={confirmPassword}
                  />
                </View>
              </View>
              <View>
                <Pressable
                  style={style.button}
                  onPress={() => {
                    validate();
                    handleSignup();
                  }}
                >
                  <Text style={style.text}>Register</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  label: {
    marginVertical: 6,
    fontSize: 18,
    color: "#08495d",
    fontWeight: 'bold',
  },
  text: {
    justifyContent: "center",
    textAlign: "center",
    paddingTop: 10,
    fontSize: 22,
    color: "#ede7d7",
  },
  pickerContainer: {
    padding: 5,
    height: 60,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: "#b3e3e3",
    flexDirection: "row",
    marginHorizontal: 15,
    borderWidth: 0.5,
    alignItems: "center",
  },
  inputContainer: {
    height: 60,
    marginBottom: 10,
    backgroundColor: "#b3e3e3",
    flexDirection: "row",
    marginHorizontal: 15,
    borderWidth: 0.5,
    alignItems: "center",
  },
  icon: {
    marginLeft: 10,
    color: "08495d",
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
    color: "#08495d",
    fontSize: 18,
    fontWeight: 'bold',
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
    backgroundColor: "#08495d",
    width: 180,
    height: 60,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
  },
  userbutton: {
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
  postcode: {
    fontSize: 20,
  },
  buttontext: {
    fontSize: 20,
    textAlign: "center",
    paddingTop: 6,
    color: "white",
  },
});
