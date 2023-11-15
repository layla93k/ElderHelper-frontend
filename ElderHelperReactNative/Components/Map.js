import React from "react";
import { Text, View, StyleSheet, Button, Pressable } from "react-native";
import MapView, { PROVIDER_GOOGLE, Polygon, Marker } from "react-native-maps";
import ManchesterPostcodes from "../assets/ManchesterPostcodes.json";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SingleJob from "./SingleJob";
import JobCard from "./JobCard"
import List from "./List";

const Stack = createNativeStackNavigator();

function Map({ navigation }) {
  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState(null);
  const [press, setPress] = useState(undefined);


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
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
    console.log("M1 CLICKED");
    setPress(title);
  };
  
  return (
    <View style={styles.view}>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => navigation.navigate("JobsList")}>
          <Text style={styles.buttonText} >Job List View</Text>
        </Pressable>
      </View>
      <MapView
        initialRegion={{
          latitude: 53.4808,
          longitude: -2.2926,
          latitudeDelta: 0.43,
          longitudeDelta: 0.34,
        }}
        style={styles.map}
        customMapStyle={mapStyle}
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
                press === area.properties.name
                  ? "rgba(122,73,165,0.7)"
                  : "rgba(120,143,151,0.4)"
              }
              strokeColor="#4974a5"
              strokeWidth={2}
              onPress={(event) => {
                handlePress(area.properties.name);
              }}
              />
          );
        })}
        {/* ***MARKERS*** */}
        <>
        <Marker coordinate={{ latitude: 53.47487, longitude: -2.23527 }} onPress={(e) => {handlePress("M1")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M1</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.47918, longitude: -2.24407 }} onPress={(e) => {handlePress("M2")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M2</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.48340, longitude: -2.25408 }} onPress={(e) => {handlePress("M3")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M3</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.48517, longitude: -2.23268 }} onPress={(e) => {handlePress("M4")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M4</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.47418, longitude: -2.27385 }} onPress={(e) => {handlePress("M5")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M5</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.49315, longitude: -2.30145 }} onPress={(e) => {handlePress("M6")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M6</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.50209, longitude: -2.26294 }} onPress={(e) => {handlePress("M7")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M7</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.50856, longitude: -2.23551 }} onPress={(e) => {handlePress("M8")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M8</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.52213, longitude: -2.21385 }} onPress={(e) => {handlePress("M9")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M9</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.47598, longitude: -2.18760 }} onPress={(e) => {handlePress("M11")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M11</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.46203, longitude: -2.19969 }} onPress={(e) => {handlePress("M12")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M12</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.46234, longitude: -2.22353 }} onPress={(e) => {handlePress("M13")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M13</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.44343, longitude: -2.22567 }} onPress={(e) => {handlePress("M14")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M14</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.46385, longitude: -2.24981 }} onPress={(e) => {handlePress("M15")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M15</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.45328, longitude: -2.26944 }} onPress={(e) => {handlePress("M16")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M16</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.46395, longitude: -2.31647 }} onPress={(e) => {handlePress("M17")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M17</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.45761, longitude: -2.17000 }} onPress={(e) => {handlePress("M18")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M18</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.43723, longitude: -2.18853 }} onPress={(e) => {handlePress("M19")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M19</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.41509, longitude: -2.23659 }} onPress={(e) => {handlePress("M20")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M20</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.42921, longitude: -2.27252 }} onPress={(e) => {handlePress("M21")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M21</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.37557, longitude: -2.25974 }} onPress={(e) => {handlePress("M22")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M22</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.39533, longitude: -2.28820 }} onPress={(e) => {handlePress("M23")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M23</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.54858, longitude: -2.20156 }} onPress={(e) => {handlePress("M24")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M24</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.52346, longitude: -2.27767 }} onPress={(e) => {handlePress("M25")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M25</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.55581, longitude: -2.33383 }} onPress={(e) => {handlePress("M26")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M26</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.51015, longitude: -2.33093 }} onPress={(e) => {handlePress("M27")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M27</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.50505, longitude: -2.39844 }} onPress={(e) => {handlePress("M28")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M28</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.49037, longitude: -2.45610 }} onPress={(e) => {handlePress("M29")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M29</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.47291, longitude: -2.38810 }} onPress={(e) => {handlePress("M30")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M30</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.41811, longitude: -2.40785 }} onPress={(e) => {handlePress("M31")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M31</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.44018, longitude: -2.31293 }} onPress={(e) => {handlePress("M32")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M32</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.41825, longitude: -2.32213 }} onPress={(e) => {handlePress("M33")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M33</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.45079, longitude: -2.12358 }} onPress={(e) => {handlePress("M34")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M34</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.50053, longitude: -2.14813 }} onPress={(e) => {handlePress("M35")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M35</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.53205, longitude: -2.42610 }} onPress={(e) => {handlePress("M38")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M38</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.49348, longitude: -2.19285 }} onPress={(e) => {handlePress("M40")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M40</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.44809, longitude: -2.36918 }} onPress={(e) => {handlePress("M41")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M41</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.47840, longitude: -2.15308 }} onPress={(e) => {handlePress("M43")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M43</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.44000, longitude: -2.43364 }} onPress={(e) => {handlePress("M44")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M44</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.53521, longitude: -2.31227 }} onPress={(e) => {handlePress("M45")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M45</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.52139, longitude: -2.49078 }} onPress={(e) => {handlePress("M46")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M46</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.47512, longitude: -2.30692 }} onPress={(e) => {handlePress("M50")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M50</Text>
        </View>
      </Marker>
<Marker coordinate={{ latitude: 53.35796, longitude: -2.27887 }} onPress={(e) => {handlePress("M90")}}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>M90</Text>
        </View>
      </Marker>
        </>
        {/* ***MARKERS*** */}
      </MapView>
      <JobCard press={press} setPress={setPress} navigation={navigation} />
    </View>
  );
}
export default function MapStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Map"
        component={Map}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="SingleJob" component={SingleJob} />
      <Stack.Screen
        name="List"
        component={List}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  customMarkerView: {
    backgroundColor: "white",
    padding: 0,
    borderRadius: 50,
    borderColor: "grey",
    borderWidth: 1,
  },
  markerText: {
    width: 20,
    textAlign: 'center',
    color: "black",
    fontSize: 8,
  },
  map: {
    flex: 4,
    zIndex: -1,
  },
  text: {
    // flex: 1,
    fontSize: 30,
    color: "#66B2FF",
    textAlign: "center",
    marginTop: 30,
  },
  view: {
    paddingTop: 10,
    height: "100%",
    width: "100%",
    backgroundColor: '#ede7d7',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#08495d',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    elevation: 3,
    marginTop: 10,
  },
  buttonText: {
    color: '#ede7d7',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.25,
    lineHeight: 21,
  },
  map: {
    flex: 6,
  },
  customMarkerView: {
    backgroundColor: "white",
    padding: 0,
    borderRadius: 50,
    borderColor: "grey",
    borderWidth: 1,
  },
  markerText: {
    width: 20,
    textAlign: 'center',
    color: "black",
    fontSize: 8,
  },
});
const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#978078"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]