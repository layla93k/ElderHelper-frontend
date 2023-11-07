import { Text, View, Button, TouchableOpacity, StyleSheet } from "react-native";
import SingleJob from "./SingleJob";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function JobCard({ navigation }) {
    // const Stack = createNativeStackNavigator();
    const handlePress = () => navigation.navigate('SingleJob')

    return (
     <View>
     <Text> Job 1 </Text>  
     <Text> Job 2</Text>
     <TouchableOpacity style={styles.button} onPress={handlePress} >
    <Text>More info</Text> 
    </TouchableOpacity>
     {/* <Stack.Navigator>
      <Stack.Screen name="SingleJob" component={SingleJob} />
      </Stack.Navigator>  */}
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


