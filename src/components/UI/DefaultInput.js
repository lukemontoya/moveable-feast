import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const defaultInput = props => (
  <TextInput
    {...props}
    style={[styles.input, props.style]}
  />
)

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: '#959595',
    padding: 7,
    marginTop: 7,
    marginBottom: 7
  }
})

export default defaultInput
