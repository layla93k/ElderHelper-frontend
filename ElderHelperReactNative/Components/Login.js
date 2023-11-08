import { View, Text, StyleSheet } from 'react-native';

export default function Login() {
    return (
    <Text style={styles.text}> In the login </Text>

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