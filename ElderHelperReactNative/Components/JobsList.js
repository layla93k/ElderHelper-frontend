import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { getJobsUsers } from '../api';

export default function JobList() {

    const [jobs, setJobs] = useState([])

    useEffect(() => {
        getJobsUsers().then((jobs) => {
            setJobs(jobs)
        })
    })

    const pressHandler = (jobId) => {
        
    }

    return (
        <View style={styles.jobsListContainer}>
            <FlatList
                style={styles.jobsList}
                keyExtractor={(item) => item.job_id }
                data={jobs}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.job} onPress={() => pressHandler(item.job_id)}>
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
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    jobsListContainer: {
      flex: 1,
      backgroundColor: '#9DD8E7',
      padding: 8,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    jobsList: {
        marginTop: 10,
        alignSelf: 'stretch'
    },
    job: {
        backgroundColor: '#D6EAEE',
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
    },
    jobTitle: {
        color: '#0072BB',
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
        color: '#0072BB',
        fontSize: 16,
    },
    jobText: {
        textAlign: 'center',
        color: '#0072BB',
    }

  });