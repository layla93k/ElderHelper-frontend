import { View, Text, Button } from "react-native"

export default function List({navigation}) {
    return (
        <View>
            <Button disabled={true} title='List' onPress={()=> navigation.navigate('List')} />
            <Button title='Map' onPress={()=> navigation.navigate('Map')}/>
        <Text> List is here </Text>

        </View>
    
    )
}