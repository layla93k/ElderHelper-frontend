import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  View,
  Button,
  Alert,
  TextInput,
} from "react-native";
import React from "react";
import Login from "./Login";
import { useNavigation } from "@react-navigation/native";
import { postNewUser } from "../api";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const navigate = useNavigation();
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
        Alert.alert("Registration successful!");
        navigation.navigate("Login");
        return;
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
    <SafeAreaView style={{ backgroundColor: "#9DD8E7", flex: 0 }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 50,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ color: "black", fontSize: 40, fontWeight: "bold" }}>
          Sign Up
        </Text>
        <Text
          style={{
            fontSize: 20,
            lineHeight: 35,
            marginBottom: 25,
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
            <Button
              title="Elder"
              onPress={() => {
                Alert.alert("You have chosen an Elder account");
                setUserType(true);
              }}
            />
            <Button
              title="Helper"
              onPress={() => {
                Alert.alert("You have chosen a Helper account");
                setUserType(false);
              }}
            />
          </View>
        </View>
        <View>
          <Text style={style.label}>Phone number</Text>
          <View style={[style.inputContainer]}>
            <Feather style={style.icon} name="phone" size={24} color="black" />
            <TextInput
              keyboardType="numeric"
              style={style.input}
              onChangeText={onChangePhoneNumber}
              value={phoneNumber}
            />
          </View>
          <View>
            <Text style={style.label}>Postcode</Text>
            <View style={[style.inputContainer]}>
              <FontAwesome
                style={style.icon}
                name="address-card-o"
                size={24}
                color="black"
              />
              <TextInput
                placeholder="Manchester postcodes only"
                style={style.input}
                onChangeText={onChangePostcode}
                value={postcode}
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
                <Button
                  style={style.button}
                  title="Register"
                  onPress={() => {
                    validate();
                    handleSignup();
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
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
    paddingTop: 30,
    backgroundColor: "#0072BB",
  },
});
