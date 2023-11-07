import { Text, View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Geojson, Marker, Callout } from 'react-native-maps';
import ManchesterPostcodes from './assets/ManchesterPostcodes.json';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';



export default function JobsMap() {
 const [errorMessage, setErrorMessage] = useState(null);
 const [location, setLocation] = useState(null)
   useEffect(() => {
    (async() => {
let { status } = await Location.requestForegroundPermissionsAsync()
console.log(status)
if (status !== "granted") {
    setErrorMessage("permission to access location denied")
    return // look into this later
}
let userLocation = await Location.getCurrentPositionAsync()
setLocation(userLocation)
    })
   }, [])
   console.log(location)
    return (
        <View style={styles.view}>
        <Text style={styles.text}>In the jobs map!</Text>
        <MapView style={styles.map} provider={PROVIDER_GOOGLE} 
        showsUserLocation={true} 
        onUserLocationChange={(event)=> {setLocation(event.nativeEvent.coordinate)}}
        >
        <Geojson geojson={ManchesterPostcodes} />
        <Marker
    coordinate={{latitude: 53.48295, longitude: -2.24108}}
    title={'M1'}
    description={'M1 postcode district'}
/>
<Marker coordinate={{latitude: 53.48305, longitude: -2.24409}}
    title={'M2'}
    description={'M2 postcode district'}>
        <Callout>
<Text>Job 1</Text>
<Text>Job 2</Text>
        </Callout>
  
    </Marker>
<Marker
    coordinate={{latitude: 53.49266, longitude: -2.25106}}
    title={'M3'}
    description={'M3 postcode district'}
/>
<Marker
    coordinate={{latitude: 53.48405, longitude: -2.23206}}
    title={'M4'}
    description={'M4 postcode district'}
/>
<Marker
    coordinate={{latitude: 53.47357, longitude: -2.28111}}
    title={'M5'}
    description={'M5 postcode district'}
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