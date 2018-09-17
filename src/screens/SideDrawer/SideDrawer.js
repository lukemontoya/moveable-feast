import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { authLogout } from '../../store/actions/auth';

class SideDrawer extends Component {

  handleLogout = () => {
    this.props.onLogout()
    Navigation.startSingleScreenApp({
     screen: {
       screen: 'moveable-feast.AuthScreen',
       title: 'Login'
     }
   });
  }

  render () {
    return (
      <View style={[
        styles.container,
        {width: Dimensions.get('window').width * .8}
      ]}>
        <TouchableOpacity onPress={this.handleLogout}>
          <View style={styles.drawerItem}>
            <Icon
              name="ios-log-out"
              size={30}
              color="black"
              style={styles.drawerItemIcon}
            />
            <Text>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: "white",
    flex: 1
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    backgroundColor: "#eee"
  },
  drawerItemIcon: {
    margin: 10
  }
})

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(authLogout())
  };
};

export default connect(null, mapDispatchToProps)(SideDrawer);
