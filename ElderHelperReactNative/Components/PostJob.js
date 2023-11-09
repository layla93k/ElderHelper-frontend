import React, {useState} from 'react';
import {Button, TextInput, Text, View, StyleSheet, Modal} from 'react-native'
import DatePicker from 'react-native-modern-datepicker'
import { getFormatedDate } from 'react-native-modern-datepicker'
 
export default PostJob = () => {
    const today = new Date();
    const tomorrow = getFormatedDate(today.setDate(today.getDate()+ 1), 'DD/MM/YYYY hh:mm')
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [expiryDate, setExpiryDate] = useState(tomorrow)
    const [submitMessage, setSubmitMessage] = useState('')

    const handlePost = () => {
        // postNewJob({
        //     "job_title": {title},
        //     "job_desc": {desc},
        //     "expiry_date": {expiryDate}
        // job id = auto assigned, posted_date = now, elder_id = user id, postcode = user postcode
        // })
        setSubmitMessage(`${title} ${desc} ${expiryDate} posted on ${today}`)
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
                        <DatePicker mode = 'datepicker'
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
        <Button title = 'Post task' onPress={handlePost}/>
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
    }
})