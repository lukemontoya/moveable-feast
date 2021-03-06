import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';


import { addPlace } from '../../store/actions/index';
import PlaceInput from '../../components/PlaceInput';
import MainText from '../../components/UI/MainText';
import HeadingText from '../../components/UI/HeadingText';
import PickImage from '../../components/PickImage';
import PickLocation from '../../components/PickLocation';
import validate from '../../utility/validation';

class SharePlaceScreen extends Component {



  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
  }

  componentWillMount() {
    this.reset();
  }

  reset = () => {
    this.setState({
      controls: {
        placeName: {
          value: "",
          valid: false,
          touched: false,
          validationRules: {
            notEmpty: true
          }
        },
        location: {
          value: null,
          valid: false
        }
      }
    });
  }

  onNavigatorEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        })
      }
    }
  }

  placeNameChangedHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value: val,
            valid: validate(val, prevState.controls.placeName.validationRules),
            touched: true
          }
        }
      };
    });
  };

locationPickedHandler = location => {
  this.setState(prevState => {
    return {
      controls: {
        ...prevState.controls,
        location: {
          value: location,
          valid: true
        }
      }
    }
  });
}

  placeAddedHandler = (placeName) => {
    this.props.onAddPlace(
      this.state.controls.placeName.value,
      this.state.controls.location.value
    );
    this.reset();
  };

  render () {
    return (
      <ScrollView>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <MainText>
            <HeadingText>Add a Restaurant</HeadingText>
          </MainText>
          <PickImage />
          <PickLocation onLocationPick={this.locationPickedHandler} />
          <PlaceInput
            placeData={this.state.controls.placeName}
            onChangeText={this.placeNameChangedHandler}
          />
          <View style={styles.button}>
            <Button
              title="Add a place"
              onPress={this.placeAddedHandler}
              disabled={
                !this.state.controls.placeName.valid ||
                !this.state.controls.location.valid
              }
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: '#eee',
    width: "80%",
    height: 150
  },
  button: {
    margin: 8
  },
  previewImage: {
    width: "100%",
    height: "100%"
  }
})

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, location) => dispatch(addPlace(placeName, location))
  }
}

export default connect(null, mapDispatchToProps)(SharePlaceScreen);
