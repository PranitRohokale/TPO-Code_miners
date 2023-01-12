import { ADMIN_REGISTER_FAIL, ADMIN_REGISTER_REQUEST, ADMIN_REGISTER_SUCCESS, ADMIN_LOGOUT, ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_FAIL, ADMIN_LOGIN_SUCCESS ,ADMIN_DETAILS_FAIL,ADMIN_DETAILS_REQUEST,ADMIN_DETAILS_RESET,ADMIN_DETAILS_SUCCESS } from "../constants/userConstants"

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_REGISTER_REQUEST:
      return { loading: true }
    case ADMIN_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case ADMIN_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case ADMIN_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      return { loading: true }
    case ADMIN_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case ADMIN_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case ADMIN_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case ADMIN_DETAILS_REQUEST:
      return { ...state, loading: true }
    case ADMIN_DETAILS_SUCCESS:
      return { loading: false, user: action.payload }
    case ADMIN_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case ADMIN_DETAILS_RESET:
      return { user: {} }
    default:
      return state
  }
}