import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

import DefaultInput from '../components/UI/DefaultInput';

const placeInput = props => (
        <DefaultInput
          placeholder="restaurant name"
          value={props.placeName}
          onChangeText={props.onChangeText}
        />
    );


export default placeInput;
