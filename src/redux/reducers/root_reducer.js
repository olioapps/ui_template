import { combineReducers } from 'redux-immutablejs'
import { INITIAL_STATE, addToList, addList, updateTaskSave, updateTaskDelete, toggleChecked, updateListName, deleteList } from '../core'

function catalog(state = INITIAL_STATE.get("catalog"), action) {
    switch(action.type){
        case 'ADD_LIST':
            return addList(state, action.listNameString, action.id)
        case 'ADD_TASK':
            return addToList(state, action.taskListID, action.taskString)
        case 'UPDATE_TASK_STRING':
            return updateTaskSave(state, action.listId, action.taskId, action.taskString)
        case 'UPDATE_TASK_DELETE':
            return updateTaskDelete(state, action.listId, action.taskId )
        case 'TOGGLE_TASK_COMPLETED':
            return toggleChecked(state, action.listId, action.taskId, action.checked )
        case 'UPDATE_LIST_NAME':
            return updateListName(state, action.taskListId, action.updatedListName)
        case 'DELETE_LIST':
            return deleteList(state, action.taskListId)

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