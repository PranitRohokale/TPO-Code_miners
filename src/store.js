import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { supabase } from './Utils/supabase.config'
import { userRegisterReducer, userLoginReducer, userDetailsReducer } from './reducers/userReducer'
import { interviewRoundReducer } from './reducers/interviewRoundReducer'

const reducer = combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userDetails: userDetailsReducer,
    interviewRounds: interviewRoundReducer
})

const userInfoFromSession = () => {

    try {
        return supabase.auth.getSession()
            .then(res => res)
            .catch(e => undefined)
        // return data;
    } catch (error) {
        console.log("ERROR AT STORE ", error);
    }
    return undefined;
}
const _userInfoFromSession = userInfoFromSession()

const initialState = {
    userLogin: { userInfo: _userInfoFromSession },
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store