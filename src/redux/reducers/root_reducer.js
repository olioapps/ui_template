import { combineReducers } from 'redux-immutablejs'
import { INITIAL_STATE, incrementValue } from '../core'

// just for hello world
function hello(state = INITIAL_STATE.get("hello"), action) {
    switch(action.type) {
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