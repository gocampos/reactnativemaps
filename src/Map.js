import React, { Component } from "react";

import { StyleSheet, Dimensions } from "react-native";

import { Container, Item, Content } from "native-base";

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import { Polyline } from "react-native-maps";

const DEFAULT_EDGE_PADDING = {
  top: 100,
  right: 100,
  bottom: 100,
  left: 100
};

export default class MapScreen extends Component {
  constructor() {
    super();

    this.state = {
      markers: [
        {
          coordinates: {
            latitude: -0.22985,
            longitude: -78.52495
          }
        },
        {
          coordinates: {
            latitude: -23.5489,
            longitude: -46.6388
          }
        }
      ]
    };
  }

  fitAllMarkers() {
    polylineCoordinates = [];
    this.state.markers.forEach(function(item) {
      polylineCoordinates.push({
        latitude: item.coordinates.latitude,
        longitude: item.coordinates.longitude
      });
    });

    this.map.fitToCoordinates(polylineCoordinates, {
      edgePadding: DEFAULT_EDGE_PADDING,
      animated: true
    });
  }

  render() {
    polylineCoordinates = [];
    this.state.markers.forEach(function(item) {
      polylineCoordinates.push({
        latitude: item.coordinates.latitude,
        longitude: item.coordinates.longitude
      });
    });

    markers = this.state.markers.map(function(item, index) {
      return <MapView.Marker key={index} coordinate={item.coordinates} />;
    });

    let initialMarker =
      typeof this.state.markers[0] != "undefined"
        ? this.state.markers[0].coordinates
        : {};
    initialMarker.latitudeDelta = 0;
    initialMarker.longitudeDelta = 0;

    return (
      <Container>
        <Content>
          <MapView
            ref={map => {
              this.map = map;
            }}
            provider={PROVIDER_GOOGLE}
            initialRegion={initialMarker}
            style={styles.mapStyle}
            fitToCoordinates={polylineCoordinates}
            onMapReady={() => this.fitAllMarkers()}
          >
            <Polyline
              coordinates={polylineCoordinates}
              strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
              strokeColors={["#FF0000"]}
              strokeWidth={6}
            ></Polyline>
            {markers}
          </MapView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});
