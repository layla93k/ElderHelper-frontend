import { Platform, Text, View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Geojson, Marker, Callout } from 'react-native-maps';
import ManchesterPostcodes from './assets/ManchesterPostcodes.json';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import JobCard from './JobCard';



export default function JobsMap() {
 const [errorMsg, setErrorMsg] = useState(null);
 const [location, setLocation] = useState(null);
   
 useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log(status)
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `latitude:${JSON.stringify(location.latitude)}, longitude:${JSON.stringify(location.longitude)}`;
  }
const handlePress = (title) => {
  setPress(title)
  console.log(title)
}

const [press, setPress] = useState('')

    return (
        <View style={styles.view}>
            <Text style={styles.text}>{text}</Text>
      < JobCard  press={press} setPress={setPress}/>
        <MapView style={styles.map} provider={PROVIDER_GOOGLE} 
        showsUserLocation={true} 
        onUserLocationChange={(event)=> {setLocation(event.nativeEvent.coordinate)}}
        >
        <Geojson geojson={ManchesterPostcodes} />
        <Marker
    coordinate={{latitude: 53.48295, longitude: -2.24108}}
    title={'M1'}
    description={'M1 postcode district'}
    onPress= {(event) => { 
        handlePress(event._dispatchInstances.memoizedProps.title)
       }}/>

<Marker coordinate={{latitude: 53.48305, longitude: -2.24409}}
    title={'M2'}
    description={'M2 postcode district'}
    onPress= {(event) => { 
        handlePress(event._dispatchInstances.memoizedProps.title)
       }}>
    </Marker>
<Marker
    coordinate={{latitude: 53.49266, longitude: -2.25106}}
    title={'M3'}
    description={'M3 postcode district'}
    onPress= {(event) => { 
        handlePress(event._dispatchInstances.memoizedProps.title)
       }}
/>
<Marker
    coordinate={{latitude: 53.48405, longitude: -2.23206}}
    title={'M4'}
    description={'M4 postcode district'}
    onPress= {(event) => { 
        handlePress(event._dispatchInstances.memoizedProps.title)
       }}
/>
<Marker
    coordinate={{latitude: 53.47357, longitude: -2.28111}}
    title={'M5'}
    description={'M5 postcode district'}
    onPress= {(event) => { 
        handlePress(event._dispatchInstances.memoizedProps.title)
       }}
/>
        </MapView>    
        </View>
    )
}

const styles = StyleSheet.create({ 
    map: {
        flex: 4 
    },
    
    text: {
        flex: 1,
        fontSize: 30,
        color: '#66B2FF',
        textAlign: 'center',
        marginTop: 30
    },
    view: {
        height: '100%',
        width: '100%'
    }
})