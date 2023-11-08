import { createStackNavigator } from '@react-navigation/stack';
import SingleJob from '../Components/SingleJob'

const Stack = createStackNavigator();

export default function StackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SingleJob" component={SingleJob} />
    </Stack.Navigator>
  );
}