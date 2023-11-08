import { View, Text, StyleSheet } from 'react-native';

export default function Profile() {
    return (

    <Text style={styles.text}> 
        In the profile
    </Text>

)}

const styles = StyleSheet.create({ 
    text: {
        flex: 1,
        fontSize: 30,
        color: '#66B2FF',
        textAlign: 'center',
        marginTop: 30
    },
})