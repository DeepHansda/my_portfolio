import projectReducer from "./project_reducer";
import contactReducer from "./contact_reducer"
import {combineReducers} from  'redux'

const rootReducer = combineReducers({
    projects:projectReducer,
    contacts:contactReducer
})

export default rootReducer