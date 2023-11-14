import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Text, View, StyleSheet, Image } from "react-native";
import { fetchJobsWithUsers, deleteJob } from "../api";
import { getFormatedDate } from "react-native-modern-datepicker";
import { CurrentUser } from "../UserContext";


export default SingleJob = () => {
const { userId, setUserId } = useContext(CurrentUser);
const [jobWithUser, setJobWithUser] = useState({})
const id = 3; //CURRENTLY HARD CODED, THIS NEEDS TO BE PASSED IN

const acceptHandler = (e) => {
e.preventDefault();
Alert.alert('Job accepted.');  //for accepting jobs as helper
}

const cancelHandler = (e) => {
    e.preventDefault();
    Alert.alert('Job cancelled.');  //for cancelling previously accepted job as helper
    }

const editOwnJobHandler = (e) => {
        e.preventDefault();
        Alert.alert('Job edited.');  //for editing own job as elder
        }

const jobCompleteHandler = (e) => {
    e.preventDefault();
    Alert.alert('Job marked as complete.')  //for marking jobs as complete
}

const deleteOwnJobHandler = (e) => {
        e.preventDefault();
            Alert.alert("Job deleted.")  //for deleting jobs as elder
        }

useEffect(() => {
    fetchJobsWithUsers().then((jobs) => {
        const requiredJob = jobs.map((job) => {
            if (job.job_id === id){
                setJobWithUser(job)
            }
        })
    })
}, [id])

    return (
    <View>
        <View style = {styles.titleBox}>
        <Text style = {styles.title}>{jobWithUser.job_title}</Text>
        <Text style = {styles.requestedBy}>Requested by: {jobWithUser.first_name}</Text></View>
        <View style = {styles.cardContent}>
            <View style = {styles.userPicView}>
        <Image style = {styles.userPic} source = {{uri: jobWithUser.avatar_url}}></Image></View>
        <View style = {styles.cardInfo}>
        <View style = {styles.desc}>
        <Text>{jobWithUser.job_desc}</Text></View>
        <Text>Posted on: {getFormatedDate(jobWithUser.posted_date)}</Text>
        <Text>Deadline: {getFormatedDate(jobWithUser.expiry_date)}</Text>
        </View>
        </View>

        {(jobWithUser.status_id === 1 && userId.isElder === true && userId.user_id === jobWithUser.elder_id) && <Button title = 'Edit job' onPress={editOwnJobHandler}></Button>}

        {(jobWithUser.status_id === 1 && userId.isElder === false) && <Button title = 'Accept job' onPress={acceptHandler}></Button>}

        {(jobWithUser.status_id === 2 && userId.isElder === false && userId.user_id === jobWithUser.helper_id) && <Button title = 'Cancel job' onPress={cancelHandler}></Button>}

        {(jobWithUser.status_id === 2) && <Button title = 'Job taken' disabled = {true}></Button>}
        
        {(jobWithUser.status_id === 3) && <Button title = 'Job complete' disabled = {true}></Button>}

        {(jobWithUser.status_id === 4) && <Button title = 'Job expired' disabled = {true}></Button>}

        {(jobWithUser.status_id !== 2 && userId.isElder === true && userId.user_id === jobWithUser.elder_id) && <Button title = 'Delete job' onPress={deleteOwnJobHandler}></Button>}
    </View>
    )
}


const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "center",
    },
    titleBox: {
        textAlign: 'center',
        margin: 15,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ffffff",
        backgroundColor: "white",
    },
    userPic: {
        width: 150,
        height: 150,
        borderRadius: 150,
        padding: 10,
        margin: 10,
    },
    requestedBy: {
    textAlign: 'center',
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ffffff",
    backgroundColor: "white",
    },
    cardContent: {
        flexDirection:'row',
        justifyContent: 'space-around'
    },
    userPicView: {
        flex: 1,
        paddingBottom: 20,
    },
    cardInfo: {
        flex: 1,
        paddingRight: 10,
        paddingBottom: 30,
        margin: 10,
    },
    desc: {
        paddingBottom: 30,
    }
})