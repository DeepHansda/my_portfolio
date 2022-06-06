import projectReducer from "./project_reducer";
import {combineReducers} from  'redux'

const rootReducer = combineReducers({
    projects:projectReducer
})

export default rootReducer