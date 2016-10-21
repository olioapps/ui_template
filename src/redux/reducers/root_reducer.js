import { combineReducers } from 'redux-immutablejs'
import { INITIAL_STATE, incrementValue, addToList } from '../core'

// just for hello world
// function hello(state = INITIAL_STATE.get("hello"), action) {
//     switch(action.type) {
//         case 'SET_GREETING':
//             return updateGreeting(state, action.greeting)
//         default:
//             return state
//     }
// }

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

// do some math
function math(state = INITIAL_STATE.get("math"), action) {
    switch(action.type){
        case 'INCREMENT':
            return incrementValue(state)
        default:
            return state
    }
}

const rootReducer = combineReducers({
    // hello,
    tasks,
    math,
})

export default rootReducer