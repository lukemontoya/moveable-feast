import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const defaultInput = props => (
  <TextInput
    {...props}
    style={[
      styles.input,
      props.style,
      !props.valid && props.touched ? styles.invalid : null]}
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
  },
  invalid: {
    backgroundColor: '#f9c0c0',
    borderColor: 'red'
  }
})

export default defaultInput
