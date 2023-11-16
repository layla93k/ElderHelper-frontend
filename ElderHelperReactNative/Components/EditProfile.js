import React, { useContext, useState } from "react";
import {
  Alert,
  Button,
  TextInput,
  Text,
  View,
  StyleSheet,
  Modal,
} from "react-native";
import { updateProfile } from "../api";
import { CurrentUser } from "../UserContext";

export default EditProfile = ({navigation}) => {
  const { userId } = useContext(CurrentUser);
  const [phoneNo, setPhoneNo] = useState(userId.phone_number);
  const [firstName, setFirstName] = useState(userId.first_name);
  const [surname, setSurname] = useState(userId.surname);
  const [elderStatus] = useState(userId.is_elder);
  const [postcode, setPostcode] = useState(userId.postcode);
  const [profileImage, setProfileImage] = useState(userId.avatar_url);
  const [profileText, setProfileText] = useState(userId.profile_msg);

  const handleUpdate = (e) => {
    e.preventDefault();
    {
      updateProfile(
        {
          phone_number: phoneNo,
          first_name: firstName,
          surname: surname,
          is_elder: elderStatus,
          postcode: postcode,
          avatar_url: profileImage,
          profile_msg: profileText,
        },
        userId.user_id
      )
        .then(() => {
          Alert.alert("UPDATED", "Profile updated successfully.",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("My Profile");
              },
            },
          ]
          );
        })
        .catch((err) => {
          console.log(err);
          Alert.alert("NOT UPDATED", "Something went wrong.",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("My Profile");
              },
            },
          ]
          );
        });
    }
  };

  return (
    <View>
      <Text>Edit Profile</Text>
      <Text>First name:</Text>
      <TextInput
        placeholder={userId.first_name}
        style={styles.textInput}
        defaultValue={userId.first_name}
        onChangeText={(value) => setFirstName(value)}
      ></TextInput>
      <Text>Surname:</Text>
      <TextInput
        placeholder={userId.surname}
        style={styles.textInput}
        defaultValue={userId.surname}
        onChangeText={(value) => setSurname(value)}
      ></TextInput>
      <Text>Avatar URL:</Text>
      <TextInput
        placeholder={userId.avatar_url}
        style={styles.textInput}
        defaultValue={userId.avatar_url}
        onChangeText={(value) => setProfileImage(value)}
      ></TextInput>
      <Text>Profile text:</Text>
      <TextInput
        multiline
        placeholder={userId.profile_msg}
        style={styles.bigTextInput}
        defaultValue={userId.profile_msg}
        onChangeText={(value) => setProfileText(value)}
      ></TextInput>
      <Text>Postcode:</Text>
      <TextInput
        placeholder={userId.postcode}
        style={styles.textInput}
        defaultValue={userId.postcode}
        onChangeText={(value) => setPostcode(value)}
      ></TextInput>
      <Text>Phone number:</Text>
      <TextInput
        placeholder={userId.phone_number}
        style={styles.textInput}
        defaultValue={userId.phone_number}
        onChangeText={(value) => setPhoneNo(value)}
      ></TextInput>

      <Button title="Update Profile" onPress={handleUpdate}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    padding: 10,
    height: 40,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#ffffff",
    borderRadius: 5,
  },
  bigTextInput: {
    height: 150,
    padding: 10,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#ffffff",
    borderRadius: 5,
  },
});
