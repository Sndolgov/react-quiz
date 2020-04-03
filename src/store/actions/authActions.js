import axios from 'axios'
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";

export function authSuccess(token) {
    console.log('token: ', token);

    return {
        type: AUTH_SUCCESS,
        token
    };
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type: AUTH_LOGOUT
    };
}

function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    };
}

export function autoLogin() {
    return (dispatch, getState) => {
        const token = localStorage.getItem('token');
        if (!token)
            dispatch(logout);
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate<= new Date()){
                dispatch(logout);
            } else {
                dispatch(authSuccess(token));
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime())/1000));
                console.log(getState().authReducer)
            }
        }
    }
}

export function auth(email, password, isLogin) {
    return async (dispatch) => {
        const auhtData = {
            email,
            password,
            returnSecureToken: true
        };
        const url = isLogin
            ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBaRUaUvhmXqxINFE_ioXGz8jWBUJNZhpg'
            : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBaRUaUvhmXqxINFE_ioXGz8jWBUJNZhpg';

        try {
            const response = await axios.post(url, auhtData);
            console.log(response.data);
            const data = response.data;
            const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

            localStorage.setItem('token', data.idToken);
            localStorage.setItem('userId', data.localId);
            localStorage.setItem('expirationDate', expirationDate);

            dispatch(authSuccess(data.idToken));
            dispatch(autoLogout(data.expiresIn));


        }catch (e) {
            console.log(e)

        }
    }
}
