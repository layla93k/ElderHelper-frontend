import React from 'react';
import { Text, View, StyleSheet, FlatList, Image, Button, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { getJobsUsers } from '../api';

export default function JobList({navigation }) {

    const [jobs, setJobs] = useState([])
    
    useEffect(() => {
        getJobsUsers().then((jobs) => {
            setJobs(jobs)
        })
    }, [])

    const pressHandler = (job) => {navigation.navigate("SingleJob", {
        jobData: {job}
      })
    }

    return (
        <View style={styles.jobsListContainer}>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={() => navigation.navigate("Map")}>
                    <Text style={styles.buttonText} >Map View</Text>
                </Pressable>
            </View>
            <View style={styles.jobsContainer}>
                <FlatList
                    style={styles.jobsList}
                    keyExtractor={(item) => item.job_id }
                    data={jobs}
                    renderItem={({ item }) => (
                        <Pressable style={styles.job} onPress={() => pressHandler(item)}>
                            <Text style={styles.jobTitle}>{item.job_title}</Text>
                            <View style={styles.row}>
                                <Image style={styles.jobImg}src={item.avatar_url}/>
                                <View style={styles.jobInfo}>
                                    <View style={styles.jobUserInfo}>
                                        <Text style={styles.jobTextUserInfo}>{item.first_name}</Text>
                                        <Text style={styles.jobTextUserInfo}>{item.postcode.split(' ')[0]}</Text>
                                    </View>
                                        <Text style={styles.jobText}>Posted: {new Date (item.posted_date).toLocaleDateString()}</Text>
                                        <Text style={styles.jobText}>Deadline: {new Date (item.expiry_date).toLocaleDateString()}</Text>
                                </View>
                            </View>
                        </Pressable>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    jobsListContainer: {
      flex: 1,
      backgroundColor: '#ede7d7',
      padding: 8,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonContainer: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    jobsContainer: {
        flex: 4,
        marginTop: 10,
        alignSelf: 'stretch',
        borderColor: 'black',
    },
    button: {
        backgroundColor: '#08495d',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 5,
        elevation: 3,
        marginTop: 10,
      },
      buttonText: {
        color: '#ede7d7',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 0.25,
        lineHeight: 21,
      },
    job: {
        backgroundColor: '#b3e3e3',
        borderRadius: 15,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 18,
        paddingRight: 18,
        marginLeft: 12,
        marginRight: 12,
        marginTop: 0,
        marginBottom: 15,
        height: 160,
        elevation: 5,
    },
    jobTitle: {
        color: '#08495d',
        alignSelf: 'center',
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 18,
    },
    jobInfo: {
        justifyContent: 'space-evenly',
        alignContent: 'center',
    },
    jobUserInfo: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    jobImg: {
        width: 100,
        height: '100%',
        borderRadius: 50,
    },
    jobTextUserInfo: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#08495d',
        fontSize: 16,
    },
    jobText: {
        textAlign: 'center',
        color: '#08495d',
    }

  });