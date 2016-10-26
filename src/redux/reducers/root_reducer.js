import { combineReducers } from 'redux-immutablejs'
import { INITIAL_STATE, addToList, addList, updateTaskSave } from '../core'

function catalog(state = INITIAL_STATE.get("catalog"), action) {
    switch(action.type){
        case 'ADD_LIST':
            return addList(state, action.listNameString, action.id)
        case 'ADD_TASK':
            return addToList(state, action.taskListID, action.taskString)
        case 'UPDATE_TASK_STRING':
            return updateTaskSave(state, action.listId, action.taskId, action.taskString)
        default:
            return state
    }
}

function currentListId(state = INITIAL_STATE.get("currentListId"), action) {
    switch(action.type){
        case 'SET_CURRENT_LIST':
            return action.taskListId
        default:
            return state
    }
}

const rootReducer = combineReducers({
    catalog,
    currentListId,
})

export default rootReducer