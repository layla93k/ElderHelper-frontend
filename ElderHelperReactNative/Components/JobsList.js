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
                keyExtractor={(item) => item.job_id }
                data={jobs}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.job} onPress={() => pressHandler(item.job_id)}>
                        <Text style={styles.jobTitle}>{item.job_title}</Text>
                        <View style={styles.row}>
                            <Image style={styles.jobImg}src={item.avatar_url}/>
                            <View>
                                <View style={styles.row}>
                                    <Text style={styles.jobText}>{item.first_name}</Text>
                                    <Text style={styles.jobText}>{item.postcode.split(' ')[0]}</Text>
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
      padding: 10,
    },
    job: {
        backgroundColor: '#D6EAEE',
        flex: 0.5,
        borderWidth: 1,
    },
    jobTitle: {
        color: '#0072BB',
        alignSelf: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    jobImg: {
        borderWidth:2,
        width: '50%',
    }

  });