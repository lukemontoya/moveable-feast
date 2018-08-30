import { SET_PLACES, REMOVE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';

export const addPlace = (placeName, location) => {
  return dispatch => {
    const placeData = {
      name: placeName,
      location: location
    };
    return fetch("https://moveablefeast-a4fdc.firebaseio.com/places.json", {
      method: "POST",
      body: JSON.stringify(placeData)
    })

    .then(res => res.json())
    .then(parsedRes => {
      console.log(parsedRes);
    })
    .catch(err => console.log(err))
  };
};

export const getPlaces = () => {
    return dispatch => {
        fetch("https://moveablefeast-a4fdc.firebaseio.com/places.json")
        .then(res => res.json())
        .then(parsedRes => {
          console.log('parsedRes', parsedRes)
            const places = [];
            for (let key in parsedRes) {
                places.push({
                    ...parsedRes[key],
                    key: key
                });
            }
            dispatch(setPlaces(places));
        })
        .catch(err => {
            alert("Something went wrong");
            console.log(err);
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
    dispatch(removePlace(key));
    fetch("https://moveablefeast-a4fdc.firebaseio.com/places/" + key + ".json", {
      method: "DELETE"
    })
    .catch(err => {
        alert("Something went wrong");
        console.log(err);
    })
    .then(res => res.json())
    .then(parsedRes => {
      console.log("done")
    })
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
