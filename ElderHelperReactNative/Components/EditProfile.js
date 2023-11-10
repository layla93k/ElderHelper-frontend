import React, {useContext, useState} from 'react';
import {Alert, Button, TextInput, Text, View, StyleSheet, Modal} from 'react-native'
import { UserType } from '../UserContext';

const Stack = createNativeStackNavigator();
 
export default EditProfile = () => {
    const {userId, setUserId} = useContext(UserType)
    const [firstName, setFirstName] = useState('')
    const [surname, setSurname] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [profileText, setProfileText] = useState('')

    return (
        <View>
            <Text>Edit Profile</Text>
            <Text>First name:</Text>
            <Text>Surname:</Text>
            <Text>Profile image URL:</Text>
            <Text>Profile text:</Text>
            <Button title = 'Submit'></Button>
        </View>
    )
}