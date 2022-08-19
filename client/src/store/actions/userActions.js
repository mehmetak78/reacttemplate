
import axios from "axios";
import jwtDecode from "jwt-decode";

import {LOGIN_USER, LOGOUT_USER} from "./actionTypes";
import {actionAddError, actionRemoveError} from "./errorActions";

const actionLoginUser = (userData) => ({
    type: LOGIN_USER,
    payload: userData
});

const actionLogOutUser = () => ({
    type: LOGOUT_USER,
    payload: ""
});


/************** HELPER FUNCTIONS **********/

const setAuthorizationToken = token => {
    if (token) {
        // Apply to every request
        axios.defaults.headers.common["Authorization"] = token;
    }
    else {
        // Delete auth header
        delete axios.defaults.headers.common["Authorization"];
    }
};


export const initApp = () => {
    return (dispatch) => {

        if (localStorage.jwtToken) {
            setAuthorizationToken(localStorage.jwtToken);
            const decoded = jwtDecode(localStorage.jwtToken);

            // prevent someone from manually tempering with the key of jwtToken in localStorage
            try {
                dispatch(actionLoginUser(decoded));
                // Check for expired token
                const currentTime = Date.now() / 1000;
                if (decoded.exp < currentTime) {
                    // Logout the user
                    dispatch(logoutUser());
                    // Redirect to login
                    window.location.href = "/login";
                }
            }
            catch (err) {
                dispatch(logoutUser());
            }
        }
    }
};

export const loginUser = (userData) => {
    return dispatch => {
        axios
            .post("/api/users/login", userData)
            .then(res => {
                const {token} = res.data;
                localStorage.setItem("jwtToken", token);
                setAuthorizationToken(token);
                try {
                    const decoded = jwtDecode(token);
                    dispatch(actionLoginUser(decoded));
                    dispatch(actionRemoveError());
                }
                catch (err) {
                    localStorage.removeItem("jwtToken");
                    setAuthorizationToken(false);
                    dispatch(actionLogOutUser());
                }
            })
            .catch(err => {
                dispatch(actionLogOutUser());
                dispatch(actionAddError(err));
            });
        };
};

// Log user out
export const logoutUser = (history) => {
    return (dispatch) => {
        localStorage.removeItem("jwtToken");
        setAuthorizationToken(false);
        dispatch(actionLogOutUser());
        if (history) {
            history.push("/");
        }
    }
};