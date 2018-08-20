import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ListItem from './ListItem'

const placeList = props => {
  const placesOutput = props.places.map((place, index) => (
    <ListItem key={index} placeName={place} />
  ))
  return(
    <View style={styles.listContainer}>
      {placesOutput}
    </View>
  )
};

const styles = StyleSheet.create({
  listContainer: {
    width: '100%'
  }
})

export default placeList;
