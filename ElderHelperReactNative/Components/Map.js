import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import MapView, { PROVIDER_GOOGLE, Polygon } from "react-native-maps";
import ManchesterPostcodes from "../assets/ManchesterPostcodes.json";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import JobCard from "./JobCard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SingleJob from "./SingleJob";
import List from "./List";
const Stack = createNativeStackNavigator();

function Map({ navigation }) {
  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log(status);
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `latitude:${JSON.stringify(
      location.latitude
    )}, longitude:${JSON.stringify(location.longitude)}`;
  }
  const handlePress = (title) => {
    setPress(title);
    console.log(title);
  };
  const [press, setPress] = useState("");

  const [selectedPolygon, setSelectedPolygon] = useState(null);

  const handlePolygonPress = (polygonId) => {
    setSelectedPolygon(polygonId);
  };

  return (

    <View style={styles.view}>
      <Button title='List' onPress={()=> navigation.navigate('List')} />
       <Button disabled={true} title='Map' onPress={()=> navigation.navigate('Map')}/>
      <JobCard press={press} setPress={setPress} navigation={navigation} />
      <MapView
        initialRegion={{
          latitude: 53.4808,
          longitude: -2.2926,
          latitudeDelta: 0.43,
          longitudeDelta: 0.34,
        }}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        onUserLocationChange={(event) => {
          setLocation(event.nativeEvent.coordinate);
        }}
      >
        {ManchesterPostcodes.features.map((area) => {
          const coordinates = area.geometry.coordinates[0].map(
            ([longitude, latitude]) => ({
              latitude,
              longitude,
            })
          );

          return (
            <Polygon
              tappable
              key={area.properties.name}
              coordinates={coordinates}
              fillColor={
                selectedPolygon === area.properties.name
                  ? "#0072BB"
                  : "rgba(0, 200, 0 ,0.5"
              }
              strokeColor="rgba(0,0,0,0.5)"
              strokeWidth={2}
              onPress={(event) => {
                handlePress(event._targetInst.return.key);
                handlePolygonPress(area.properties.name);
              }}
            />
          );
        })}
      </MapView>
      <JobCard press={press} setPress={setPress} />
    </View>
  );
}
export default function MapStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Map" component={Map} options={{headerShown: false}} />
      <Stack.Screen name="SingleJob" component={SingleJob} />
      <Stack.Screen name="List" component={List} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 4,
  },

  text: {
    flex: 1,
    fontSize: 30,
    color: "#66B2FF",
    textAlign: "center",
    marginTop: 30,
  },
  view: {
    height: "100%",
    width: "100%",
  },
});
