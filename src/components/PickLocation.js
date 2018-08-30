import React, { Component } from 'react';
import { View, Image, Button, StyleSheet, Text, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 33.4484;
const LONGITUDE = -112.0740;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


class PickLocation extends Component {
  state = {
    focusedLocation: {
      latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    },
    locationChosen: false
  }

  pickLocationHandler = event => {
    const coords = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude
    });
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        locationChosen: true
      };
    });
    this.props.onLocationPick({
      latitude: coords.latitude,
      longitude: coords.longitude
    });
  };

  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      const coordsEvent = {
        nativeEvent: {
          coordinate: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }
        }
      };
      this.pickLocationHandler(coordsEvent);
    },
    err=> {
      console.log(err);
      alert('Position Failed');
    });
  }

  render() {
    let marker = null;
    if (this.state.locationChosen === true) {
      marker = <MapView.Marker coordinate={this.state.focusedLocation} />
    }
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.state.focusedLocation}
          style={styles.map}
          onPress={this.pickLocationHandler}
          ref={ref => this.map = ref}
        >
         {marker}
        </MapView>
        <View style={styles.button}>
          <Button title="locate me" onPress={this.getLocationHandler}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  map: {
    width: "100%",
    height: 250
  },
  button: {
    margin: 8
  }
})

export default PickLocation;
