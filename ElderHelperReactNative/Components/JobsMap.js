import { Text, View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Geojson, Marker, Callout, Polygon } from 'react-native-maps';
import ManchesterPostcodes from '../assets/ManchesterPostcodes.json';
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
    <JobCard  press={press} setPress={setPress}/>
    <MapView 
        initialRegion={{
            latitude: 53.4808,
            longitude: -2.2926,
            latitudeDelta: 0.43,
            longitudeDelta: 0.34
        }}
        style={styles.map}
        provider={PROVIDER_GOOGLE} 
        showsUserLocation={true} 
        onUserLocationChange={(event)=> {setLocation(event.nativeEvent.coordinate)}}
    >
    {
        ManchesterPostcodes.features.map((area) => {
            const coordinates = area.geometry.coordinates[0].map(([longitude, latitude]) => ({
                latitude,
                longitude,
            }));
            return (
                <Polygon
                    tappable
                    key={area.properties.name}
                    coordinates={coordinates}
                    fillColor="rgba(0, 200, 0, 0.5)"
                    strokeColor="rgba(0,0,0,0.5)"
                    strokeWidth={2}
                    onPress= {(event) => { 
                        handlePress(event._targetInst.return.key)
                    }}
                />
            )
        })
    }
    
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