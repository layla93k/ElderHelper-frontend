import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet, Image, Button, Alert } from 'react-native';
import { UserType } from '../UserContext';


export default function Profile() {

const {userId, setUserId} = useContext(UserType)

    return (
<View>
    <View style = {styles.profilePicView}>
        <Image style = {styles.profilePic}
        source={{
          uri: 'https://images.unsplash.com/photo-1682687220801-eef408f95d71?q=80&w=2787',
        }}></Image></View>
        <View style = {styles.nameView}>
         <Text style = {styles.name}>{userId.first_name} {userId.surname}</Text>
         </View>
         <View style = {styles.profileView}>
         <Text style = {styles.category}>Phone number</Text>
    <Text style = {styles.info}>{userId.phoneNumber}</Text>
    <Text style = {styles.category}>Postcode</Text>
    <Text style = {styles.info}>{userId.postcode}</Text>
    <Text style = {styles.category}>Profile message</Text>
    <Text style = {styles.info}>{userId.profile_msg}</Text>
    </View>
    <View style = {styles.button}>
    <Button title = 'Update Profile'></Button>
    </View>
</View>
)}

const styles = StyleSheet.create({
    profilePicView: { 
        paddingTop: 100,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileView: {
        paddingTop: 10,
    },
    nameView: {
        paddingTop: 100,
    },
    category: {
        fontWeight: 'bold',
        paddingLeft: 20,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 40,
        textAlign: 'center'
    },
    info: {
        margin: 15,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ffffff',
        backgroundColor: 'white'
    },
    profilePic: {
        width: 150,
        height: 150,
        borderRadius: 150,
    },
    button: {
        paddingTop: 10,
    }
})