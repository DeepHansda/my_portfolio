import {createStore,applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {configureStore} from '@reduxjs/toolkit'
// import  middleware from [thunk]
import projectReducer from '../Reducers/project_reducer'
const initialState = {}

const store = configureStore({
    reducer:{
        projects:projectReducer
    }
})

export default store