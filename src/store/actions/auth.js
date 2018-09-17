import { TRY_AUTH, AUTH_SET_TOKEN } from './actionTypes';
import startMainTabs from "../../screens/MainTabs/startMainTabs";
import App from '../../../App';
import { auth } from '../../../firebase';


export const tryAuth = (authData, authMode) => {
  return dispatch => {
    if (authMode === "signup") {
        auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .catch(err => {
              console.log("Error creating user", err)
            })
            .then(res => {
              console.log("res", res)
              console.log('created user: ', auth.currentUser.uid)
            });
    }else{

      auth.signInWithEmailAndPassword(authData.email, authData.password)
          .catch(err => {
            console.log('_____LOGIN ERROR_____',err);
            alert("Authentication failed, try again!");
          })
          .then(res => {
            console.log("res", res)
          });
    }
  };
};

export const authSetToken = token => {
  return {
    type: AUTH_SET_TOKEN,
    token: token
  }
}

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token;
      if (!token) {
        reject();
      } else {
          resolve(token);
      }
    });
    return promise;
  }
}
export const authLogout = () => {
  return dispatch => {
    auth.signOut().then(() => {
      console.log('logging out...')
    })
    .catch(err => console.log("error", err))
  }
}
