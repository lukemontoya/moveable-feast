import { TRY_AUTH } from './actionTypes';
import startMainTabs from "../../screens/MainTabs/startMainTabs";


export const tryAuth = (authData, authMode) => {
  return dispatch => {
    const apiKey = "";
    let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + apiKey;
    if (authMode === "signup") {
        url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + apiKey
    }
    fetch(
        url,
        {
          method: "POST",
          body: JSON.stringify({
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
        .catch(err => {
          console.log(err);
          alert("Authentication failed, try again!");
        })
        .then(res => res.json())
        .then(parsedRes => {
          if (parsedRes.error) {
            alert("Authentication failed, try again!");
          } else {
            startMainTabs();
          }
        });
  };
};
