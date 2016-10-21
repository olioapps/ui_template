import { combineReducers } from 'redux-immutablejs'
import { INITIAL_STATE, addToList, saveList } from '../core'

// just for hello world
// function hello(state = INITIAL_STATE.get("hello"), action) {
//     switch(action.type) {
//         case 'SET_GREETING':
//             return updateGreeting(state, action.greeting)
//         default:
//             return state
//     }
// }

function list(state = INITIAL_STATE.get("listOfLists"), action) {
    switch(action.type){
        case 'ADD_LIST':
            return saveList(state, action.listNameString)
        default:
            return state
    }
}

function tasks(state = INITIAL_STATE.get("listOfTasks"), action) {
    switch(action.type){
        case 'ADD_TASK':
            return addToList(state, action.taskString)
        default:
            return state
    }
}

// function addTask(state = INITIAL_STATE.get("task"), action) {
//     switch(action.type){
//         case 'ADD_TASK':
//             return setTask(state, action.taskString)
//         default:
//             return state
//     }
// }


const rootReducer = combineReducers({
    tasks,
    list,
})

export default rootReducer