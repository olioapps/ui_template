import { combineReducers } from 'redux-immutablejs'
import { INITIAL_STATE, incrementValue, updateGreeting } from '../core'

// just for hello world
function hello(state = INITIAL_STATE.get("hello"), action) {
    switch(action.type) {
        case 'SET_GREETING':
            return updateGreeting(state, action.value)
        default:
            return state
    }
}

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
    hello: hello,
    math:  math,
})

export default rootReducer