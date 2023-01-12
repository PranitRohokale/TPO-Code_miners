import { supabase } from "../Utils/supabase.config"
import { ADMIN_REGISTER_FAIL, ADMIN_REGISTER_REQUEST, ADMIN_REGISTER_SUCCESS, ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_FAIL, ADMIN_LOGIN_SUCCESS, ADMIN_LOGOUT, ADMIN_DETAILS_FAIL, ADMIN_DETAILS_REQUEST, ADMIN_DETAILS_SUCCESS } from "../constants/userConstants"

export const register = ({ firstName, middleName, lastName, gender, dob, email, password, role }) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_REGISTER_REQUEST,
        })


        const { data, error } = await supabase.auth.signUp({
            email ,
            password ,
            options: {
                data: {
                    role
                },
            },
        });


        dispatch({
            type: ADMIN_REGISTER_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: ADMIN_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_LOGIN_REQUEST,
        })


        const { data } = await supabase.auth.signInWithPassword({
            email, password
        })


        dispatch({
            type: ADMIN_LOGIN_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: ADMIN_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const logout = () => async (dispatch) => {
    try {
        const { data } = await supabase.auth.signOut()
    } catch (error) {
        console.log(error);
    }

    dispatch({ type: ADMIN_LOGOUT })

    document.location.href = '/login'
}

export const getUserDetails = () => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_DETAILS_REQUEST,
        })

        const { data: { user } } = await supabase.auth.getUser()

        dispatch({
            type: ADMIN_DETAILS_SUCCESS,
            payload: user,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: ADMIN_DETAILS_FAIL,
            payload: message,
        })
    }
}