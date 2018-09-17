import { SET_PLACES, REMOVE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';
import { auth, database } from '../../../firebase';


const places = database.ref('places')

export const addPlace = (placeName, location) => {
  return dispatch => {
    const placeData = {
      name: placeName,
      location: location,
      owner: auth.currentUser.uid
    };
    places.push().set(placeData)
    .then(() => {
      dispatch(getPlaces())
    })
  };
};

export const getPlaces = () => {
  console.log('previously logged in user', auth.currentUser.uid)

    return dispatch => {

        places
          .orderByChild('owner')
          .equalTo(auth.currentUser.uid)
          .on('value', results => {
          let p = results.val()
          let arr = []
          for( let key in p ){
            arr.push({...p[key], key})
          }
          dispatch(setPlaces(arr));

        })
    };
};

export const setPlaces = places => {
  return {
    type: SET_PLACES,
    places: places
  };
};

export const deletePlace = (key) => {
  return dispatch => {
    places.child(key).remove()
    .then(() => dispatch(removePlace(key)))
    .catch(err => {
        alert("Something went wrong");
        console.log(err);
    })
  };
};

export const removePlace = key => {
  return {
    type: REMOVE_PLACE,
    key: key
  };
};
