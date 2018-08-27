import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawerScreen from './src/screens/SideDrawer/SideDrawer';
import configureStore from './src/store/configureStore';

const store = configureStore();


//Register Screens
Navigation.registerComponent(
  'moveable-feast.AuthScreen',
  () => AuthScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'moveable-feast.SharePlaceScreen',
  () => SharePlaceScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'moveable-feast.FindPlaceScreen',
  () => FindPlaceScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'moveable-feast.PlaceDetailScreen',
  () => PlaceDetailScreen,
  store,
  Provider
);
  Navigation.registerComponent(
    'moveable-feast.SideDrawerScreen',
    () => SideDrawerScreen
  );

//Start App
Navigation.startSingleScreenApp({
  screen: {
    screen: 'moveable-feast.AuthScreen',
    title: 'Login'
  }
})
