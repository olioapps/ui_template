import { combineReducers } from 'redux-immutablejs'
import { INITIAL_STATE, addToList, addList, setCurrentListID } from '../core'

function catalog(state = INITIAL_STATE.get("catalog"), action) {
    switch(action.type){
        case 'ADD_LIST':
            return addList(state, action.listNameString, action.id)
        default:
            return state
    }
}

function tasks(state = INITIAL_STATE.get("catalog"), action) {
    switch(action.type){
        case 'ADD_TASK':
            return addToList(state, action.taskListID, action.taskString)
        default:
            return state
    }
}

function currentListId(state = '', action) {
    switch(action.type){
        case 'SET_CURRENT_LIST':
            // return setCurrentListID(state, action.taskListId)
            return action.taskListId
        default:
            return state
    }
}

const rootReducer = combineReducers({
    tasks,
    catalog,
    currentListId,
})

export default rootReducer