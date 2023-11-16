import React, { useContext, useState, useCallback } from "react";
import { View, Text, StyleSheet, Image, Button, Pressable, Alert, SafeAreaView} from "react-native";
import { CurrentUser } from "../UserContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFocusEffect } from '@react-navigation/native';
import EditProfile from "./EditProfile";
import { getExistingUser } from "../api";

const Stack = createNativeStackNavigator();

function Profile({ navigation }) {
  const { userId, setUserId } = useContext(CurrentUser);
  const [user, setUser] = useState({})
  

  useFocusEffect(
    useCallback(() => {
      getExistingUser(userId.phone_number).then(({ user }) => {
        setUser(user);
      });
    }, [userId.phone_number])
  );

  return (
    <SafeAreaView style={{ backgroundColor: "#EDE7D7" }}>
      <View style={styles.profilePicView}>
        <Image
          style={styles.profilePic}
          source={{
            uri: user.avatar_url,
          }}
        ></Image>
      </View>
      <View style={styles.nameView}>
        <Text style={styles.name}>
          {user.first_name} {user.surname}
        </Text>
      </View>
      <View style={styles.profileView}>
        <Text style={styles.category}>Phone number</Text>
        <Text style={styles.info}>{user.phone_number}</Text>
        <Text style={styles.category}>Postcode</Text>
        <Text style={styles.info}>{user.postcode}</Text>
        <Text style={styles.category}>Profile message</Text>
        <Text style={styles.info}>{user.profile_msg}</Text>
      </View>
      <View>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Edit Profile")}
        >
          <Text style={styles.buttonText}>Update Profile</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default function ProfileNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="My Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  profilePicView: {
    paddingTop: 100,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD8E7",
    zIndex: 1,
  },
  profileView: {
    paddingTop: 10,
    backgroundColor: "#EDE7D7",
  },
  nameView: {
    paddingTop: 100,
    backgroundColor: "#EDE7D7",
  },
  category: {
    fontWeight: "bold",
    paddingLeft: 20,
    backgroundColor: "#EDE7D7",
  },
  name: {
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
    color: "#08495d",
  },
  info: {
    backgroundColor: "#EDE7D7",
    margin: 15,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#08495d",
    backgroundColor: "#b3e3e3",
    fontSize: 18,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 150,
  },
  button: {
    padding: 5,
    marginTop: 10,
    borderRadius: 10,
    padding: 5,
    backgroundColor: "#08495d",
    width: 180,
    height: 60,
    flex: "row",
    alignSelf: "center",
  },
  buttonText: {
    backgroundColor: "#08495d",
    justifyContent: "center",
    textAlign: "center",
    paddingTop: 10,
    fontSize: 22,
    color: "white",
  },
  category: {
    fontSize: 20,
    marginLeft: 15,
    color: "#08495d",
  },
});
