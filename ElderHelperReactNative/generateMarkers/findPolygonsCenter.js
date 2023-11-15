import ManchesterPostcodes from "../assets/ManchesterPostcodes.json" assert { type: "json" };
function generateJSXMarkers() {
    const markersJSX = ManchesterPostcodes.features.map((area) => {
      const coordinates = area.geometry.coordinates[0];
      let x = coordinates.map(c => c[1]);
      let y = coordinates.map(c => c[0]);
  
      let minX = Math.min(...x);
      let maxX = Math.max(...x);
  
      let minY = Math.min(...y);
      let maxY = Math.max(...y);
  
      const latitude = (minX + maxX) / 2;
      const longitude = (minY + maxY) / 2;
  
      // Generating JSX as string
      return (
      `<Marker coordinate={{ latitude: ${latitude.toFixed(5)}, longitude: ${longitude.toFixed(5)} }}>
        <View style={styles.customMarkerView}>
          <Text style={styles.markerText}>${area.properties.name}</Text>
        </View>
      </Marker>`
      );
    });
  
    // This will join all the marker strings into one single string
    return markersJSX.join('\n');
  }
  
  // Use the function to log out all markers
  console.log(generateJSXMarkers());
    