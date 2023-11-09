import React from 'react';
import { useNavigation } from '@react-navigation/native'

export default function TaskBoard() { 

    const navigation = useNavigation()

    return (
        <View>
            <Text onPress={() => navigation.navigate('SingleJob')}>SingleJob</Text>
        </View>
    )
    
}