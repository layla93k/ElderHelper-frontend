import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
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
    setPress(title);
  };
  
  return (
    <View style={styles.view}>
      <Button title="List" onPress={() => navigation.navigate("List")} />
      <Button
        disabled={true}
        title="Map"
        onPress={() => navigation.navigate("Map")}
      />
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
          <Marker coordinate={{ latitude: 53.47687, longitude: -2.23527 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M1</Text>
          </View>
        </Marker>
  <Marker coordinate={{ latitude: 53.47918, longitude: -2.24407 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M2</Text>
          </View>
        </Marker>
  <Marker coordinate={{ latitude: 53.48340, longitude: -2.25408 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M3</Text>
          </View>
        </Marker>
  <Marker coordinate={{ latitude: 53.48517, longitude: -2.22768 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M4</Text>
          </View>
        </Marker>
  <Marker coordinate={{ latitude: 53.47718, longitude: -2.29485 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M5</Text>
          </View>
        </Marker>
  <Marker coordinate={{ latitude: 53.49515, longitude: -2.30145 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M6</Text>
          </View>
        </Marker>
  <Marker coordinate={{ latitude: 53.50209, longitude: -2.26894 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M7</Text>
          </View>
        </Marker>
  <Marker coordinate={{ latitude: 53.51356, longitude: -2.23851 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M8</Text>
          </View>
        </Marker>
  <Marker coordinate={{ latitude: 53.52213, longitude: -2.21385 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M9</Text>
          </View>
        </Marker>
  <Marker coordinate={{ latitude: 53.47998, longitude: -2.17960 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M11</Text>
          </View>
        </Marker>
  <Marker coordinate={{ latitude: 53.46603, longitude: -2.20669 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M12</Text>
          </View>
        </Marker>
  <Marker coordinate={{ latitude: 53.45934, longitude: -2.21653 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M13</Text>
          </View>
        </Marker>
  <Marker coordinate={{ latitude: 53.44643, longitude: -2.22567 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M14</Text>
          </View>
        </Marker>
  <Marker coordinate={{ latitude: 53.46685, longitude: -2.24981 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M15</Text>
          </View>
        </Marker>
  <Marker coordinate={{ latitude: 53.45428, longitude: -2.26944 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M16</Text>
          </View>
        </Marker>
  <Marker coordinate={{ latitude: 53.46795, longitude: -2.32247 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M17</Text>
          </View>
        </Marker>
  <Marker coordinate={{ latitude: 53.45961, longitude: -2.16800 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M18</Text>
          </View>
        </Marker>
  <Marker coordinate={{ latitude: 53.43023, longitude: -2.19453 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M19</Text>
          </View>
        </Marker>
  <Marker coordinate={{ latitude: 53.42009, longitude: -2.23859 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M20</Text>
          </View>
        </Marker>
  <Marker coordinate={{ latitude: 53.43321, longitude: -2.27152 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M21</Text>
          </View>
        </Marker>
  <Marker coordinate={{ latitude: 53.38757, longitude: -2.26174 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M22</Text>
          </View>
        </Marker>
  <Marker coordinate={{ latitude: 53.39733, longitude: -2.29220 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M23</Text>
          </View>
        </Marker>
  <Marker coordinate={{ latitude: 53.55658, longitude: -2.20156 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M24</Text>
          </View>
        </Marker>
  <Marker coordinate={{ latitude: 53.52546, longitude: -2.27267 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M25</Text>
          </View>
        </Marker>
  <Marker coordinate={{ latitude: 53.55581, longitude: -2.33183 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M26</Text>
          </View>
        </Marker>
  <Marker coordinate={{ latitude: 53.51615, longitude: -2.33093 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M27</Text>
          </View>
        </Marker>
  <Marker coordinate={{ latitude: 53.50905, longitude: -2.39844 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M28</Text>
          </View>
        </Marker>
  <Marker coordinate={{ latitude: 53.49737, longitude: -2.46110 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M29</Text>
          </View>
        </Marker>
  <Marker coordinate={{ latitude: 53.47791, longitude: -2.38010 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M30</Text>
          </View>
        </Marker>
        <Marker coordinate={{ latitude: 53.42311, longitude: -2.40785 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M31</Text>
          </View>
        </Marker>
        <Marker coordinate={{ latitude: 53.44918, longitude: -2.31293 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M32</Text>
          </View>
        </Marker>
        <Marker coordinate={{ latitude: 53.42225, longitude: -2.32213 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M33</Text>
          </View>
        </Marker>
        <Marker coordinate={{ latitude: 53.45879, longitude: -2.12358 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M34</Text>
          </View>
        </Marker>
        <Marker coordinate={{ latitude: 53.50553, longitude: -2.14813 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M35</Text>
          </View>
        </Marker>
        <Marker coordinate={{ latitude: 53.53205, longitude: -2.42610 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M38</Text>
          </View>
        </Marker>
        <Marker coordinate={{ latitude: 53.50548, longitude: -2.19285 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M40</Text>
          </View>
        </Marker>
        <Marker coordinate={{ latitude: 53.45309, longitude: -2.36918 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M41</Text>
          </View>
        </Marker>
        <Marker coordinate={{ latitude: 53.48640, longitude: -2.14508 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M43</Text>
          </View>
        </Marker>
        <Marker coordinate={{ latitude: 53.44400, longitude: -2.43364 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M44</Text>
          </View>
        </Marker>
        <Marker coordinate={{ latitude: 53.54221, longitude: -2.29727 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M45</Text>
          </View>
        </Marker>
        <Marker coordinate={{ latitude: 53.52439, longitude: -2.49078 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M46</Text>
          </View>
        </Marker>
        <Marker coordinate={{ latitude: 53.47512, longitude: -2.30692 }}>
          <View style={styles.customMarkerView}>
            <Text style={styles.markerText}>M50</Text>
          </View>
        </Marker>
        <Marker coordinate={{ latitude: 53.36196, longitude: -2.27887 }}>
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
        "visibility": "simplified"
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