import { Text, View, Button, TouchableOpacity, StyleSheet, use } from "react-native";
import { useNavigation } from '@react-navigation/native';
export default function JobCard({ press, setPress}) {
  const navigation = useNavigation();
  const jobs = [
    {
      job_title: "Companionship",
      job_desc:
        "Looking for someone to keep me company and chat with me in the evenings.",
      posted_date: "2023-11-06",
      expiry_date: "2023-11-20",
      elder_id: 1,
      helper_id: 101,
      status_id: 2,
      postcode: 'M1'
    },
    {
      job_title: "Grocery Shopping",
      job_desc: "Need help with grocery shopping once a week.",
      posted_date: "2023-11-08",
      expiry_date: "2023-11-15",
      elder_id: 2,
      helper_id: 102,
      status_id: 1,
      postcode: 'M23'
    },
    {
      job_title: "Medication Reminder",
      job_desc: "Require assistance in taking my medications at the right times.",
      posted_date: "2023-11-10",
      expiry_date: "2023-11-25",
      elder_id: 3,
      helper_id: 103,
      status_id: 3,
      postcode: 'M41'
    },
    {
      job_title: "Transportation Assistance",
      job_desc:
        "Looking for someone to drive me to doctor's appointments and grocery stores.",
      posted_date: "2023-11-12",
      expiry_date: "2023-11-26",
      elder_id: 4,
      helper_id: 104,
      status_id: 2,
      postcode: 'M30'
    },
    {
      job_title: "Meal Preparation",
      job_desc: "Need help with preparing and cooking meals for the week.",
      posted_date: "2023-11-14",
      expiry_date: "2023-11-21",
      elder_id: 5,
      helper_id: 105,
      status_id: 1,
      postcode: 'M23'
    },
    {
      job_title: "House Cleaning",
      job_desc: "Seeking assistance with general house cleaning and organizing.",
      posted_date: "2023-11-16",
      expiry_date: "2023-11-30",
      elder_id: 6,
      helper_id: 106,
      status_id: 4,
      postcode: 'M6'
    },
    {
      job_title: "Outdoor Activities",
      job_desc:
        "Looking for a companion to go for walks and enjoy outdoor activities.",
      posted_date: "2023-11-18",
      expiry_date: "2023-11-27",
      elder_id: 7,
      helper_id: 107,
      status_id: 1,
      postcode: 'M7'
    },
    {
      job_title: "Pet Care",
      job_desc:
        "Need assistance in taking care of my pet dog, including feeding and walks.",
      posted_date: "2023-11-20",
      expiry_date: "2023-12-05",
      elder_id: 8,
      helper_id: 108,
      status_id: 2,
      postcode: 'M32'
    },
    {
      job_title: "Tech Support",
      job_desc:
        "Require help with using and troubleshooting my computer and smartphone.",
      posted_date: "2023-11-22",
      expiry_date: "2023-12-10",
      elder_id: 9,
      helper_id: 109,
      status_id: 3,
      postcode: 'M8'
    },
    {
      job_title: "Yard Maintenance",
      job_desc: "Looking for someone to mow the lawn and maintain my garden.",
      posted_date: "2023-11-24",
      expiry_date: "2023-12-15",
      elder_id: 10,
      helper_id: 110,
      status_id: 4,
      postcode: 'M33'
    },
    {
      job_title: "Reading Assistance",
      job_desc:
        "Need help with reading books and newspapers due to vision impairment.",
      posted_date: "2023-11-26",
      expiry_date: "2023-12-20",
      elder_id: 11,
      helper_id: 111,
      status_id: 2,
      postcode: 'M11'
    },
    {
      job_title: "Transportation Assistance",
      job_desc:
        "Looking for someone to drive me to doctor's appointments and grocery stores.",
      posted_date: "2023-11-12",
      expiry_date: "2023-11-26",
      elder_id: 12,
      helper_id: 112,
      status_id: 1,
      postcode: 'M40'
    },
    {
      job_title: "Art and Crafts",
      job_desc:
        "Seeking a creative companion to engage in arts and crafts activities.",
      posted_date: "2023-11-28",
      expiry_date: "2023-12-08",
      elder_id: 13,
      helper_id: 113,
      status_id: 3,
      postcode: 'M46'
    },
    {
      job_title: "Tech Support",
      job_desc:
        "Require help with using and troubleshooting my computer and smartphone.",
      posted_date: "2023-11-30",
      expiry_date: "2023-12-12",
      elder_id: 14,
      helper_id: 114,
      status_id: 2,
      postcode: 'M24'
    },
    {
      job_title: "Exercise Partner",
      job_desc:
        "Looking for a fitness buddy to exercise and stay active together.",
      posted_date: "2023-12-02",
      expiry_date: "2023-12-18",
      elder_id: 15,
      helper_id: 115,
      status_id: 4,
      postcode: 'M27'
    },
    {
      job_title: "Music Appreciation",
      job_desc: "Seeking someone to listen to and discuss music with me.",
      posted_date: "2023-12-04",
      expiry_date: "2023-12-22",
      elder_id: 16,
      helper_id: 116,
      status_id: 1,
      postcode: 'M32'
    },
    {
      job_title: "Language Tutoring",
      job_desc: "Need help learning a new language or improving language skills.",
      posted_date: "2023-12-06",
      expiry_date: "2023-12-25",
      elder_id: 17,
      helper_id: 117,
      status_id: 3,
      postcode: 'M15'
    },
    {
      job_title: "Transportation Assistance",
      job_desc:
        "Looking for someone to drive me to doctor's appointments and the supermarket.",
      posted_date: "2023-11-12",
      expiry_date: "2023-11-26",
      elder_id: 18,
      helper_id: 118,
      status_id: 2,
      postcode: 'M26'
    },
    {
      job_title: "Gardening",
      job_desc:
        "Seeking a gardening enthusiast to help with planting and maintaining a garden.",
      posted_date: "2023-12-08",
      expiry_date: "2023-12-30",
      elder_id: 19,
      helper_id: 119,
      status_id: 4,
      postcode: 'M19'
    },
    {
      job_title: "Movie Buddy",
      job_desc:
        "Looking for a movie companion to watch and discuss films together.",
      posted_date: "2023-12-10",
      expiry_date: "2023-12-24",
      elder_id: 20,
      helper_id: 120,
      status_id: 1,
      postcode: 'M22'
    },
  ]
  const filteredJobs = jobs.filter((job) => job.postcode === press)
  
  return (
    <View>
      {
        filteredJobs.length === 0 ? (
           press ? <Text> No jobs in { press }</Text> : <Text>Choose an area</Text>
        ) : (
          filteredJobs.map((job, index) => (
            <View key={index}>
              <Text>{job.job_title}</Text>
              <Text>{job.job_desc}</Text>
              <Button title='more info' onPress={() => navigation.navigate('SingleJob')} />
            </View>
          ))
        )
        }     
        <Button title={'reset'} onPress={()=> {setPress('')}}/>
     </View>
    )
} 

const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10,
    },
});

