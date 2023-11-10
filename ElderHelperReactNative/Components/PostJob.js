import React, {useState} from 'react';
import { postJob } from '../api';
import {Alert, Button, TextInput, Text, View, StyleSheet, Modal} from 'react-native'
import DatePicker from 'react-native-modern-datepicker'
import { getFormatedDate } from 'react-native-modern-datepicker'
 
export default PostJob = () => {
    const today = new Date()
    const tomorrow = getFormatedDate(today.setDate(today.getDate()+ 1))
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [expiryDate, setExpiryDate] = useState(tomorrow)
    const [submitMessage, setSubmitMessage] = useState('')

    const validation = () => {
        if (!title){
            Alert.alert('Please add a title.')}
            else if (!desc){
            Alert.alert('Please add a description.')}
        else {postJob({
            "job_title": title,
            "job_desc": desc,
            "posted_date": today,
            "expiry_date": expiryDate,
            "elder_id": 2,
            "helper_id": 1,
            "postcode": "M12 3AB"
        }).then((res) => {
            setSubmitMessage("Job posted successfully!")
        })
          .catch((err) => {console.log(err)
           setSubmitMessage('Error')})
    }
        }
    
    const handleOnPress = () => {
        setOpen(!open);
    }

    
    return(
        <View style = {styles.form}>
        <View style = {styles.question}>
        <Text style = {styles.labels}>Job Title</Text>
        <TextInput placeholder = 'e.g. Dog walking' style = {styles.textInput}onChangeText = {(value) => setTitle(value)}></TextInput>
        </View>
        <View style = {styles.question}>
        <Text style = {styles.labels}>Job Description</Text>
        <TextInput placeholder = 'e.g. I need a daily dog walker for my two dogs' style = {styles.bigTextInput} onChangeText = {(value) => setDesc(value)}></TextInput></View>
        <View>
            <Text style = {styles.labels}>Deadline: {expiryDate}</Text>
            <Button title = 'Select deadline' onPress = {handleOnPress}/>
            <Modal animationType='slide'
            transparent={true}
            visible={open}>
                <View style = {styles.centeredView}>
                    <View style = {styles.modalView}>
                        <DatePicker  options={{
                        textHeaderColor: '#0072BB',
                        textDefaultColor: '#0072BB',
                        selectedTextColor: '#0072BB',
                        mainColor: '#9DD8E7',
                        textSecondaryColor: '#D6EAEE',
                        }}
                        mode = 'calendar'
                        minimumDate={tomorrow}
                        selected={expiryDate}
                        minuteInterval={15}
                        onSelectedChange={date => setExpiryDate(date)}
                       />
                    <Button title = 'Select Date' onPress = {handleOnPress}/>
                    </View>
                </View>
            </Modal>
              </View>
              <View style = {styles.buttons}>
        <Button title = 'Post job' onPress={validation}/></View>
        <Text>{submitMessage}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 10,
        alignItems: "left",
    },
    labels: {
        fontWeight: 'bold',
        paddingTop: 30,
        paddingBottom: 10,
    },
    textInput: {
        padding: 10,
        height: 40,
        borderWidth: 1,
        borderColor: '#000000',
        backgroundColor: '#ffffff',
        borderRadius: 5,
    },
    bigTextInput: {
        height: 150,
        padding: 10,
        borderWidth: 1,
        borderColor: '#000000',
        backgroundColor: '#ffffff',
        borderRadius: 5,
    },
    expDate: {
        paddingTop: 30,
        paddingBottom: 30,    
    },
    modalView: {
        alignItems: 'center',
        width: '90%',
        margin: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    buttons: {
        paddingTop: 100,
        paddingBottom: 10,
    }
})