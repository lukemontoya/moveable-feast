import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import ListItem from './ListItem'

const placeList = props => {
  return(
    <FlatList
      style={styles.listContainer}
      data={props.places}
      renderItem={(info) => (
        <ListItem
          placeName={info.item.name}
          onItemPressed={() => props.onItemSelected(info.item.key)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: '100%'
  }
})

export default placeList;
