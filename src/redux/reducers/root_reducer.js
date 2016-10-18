import { combineReducers } from 'redux-immutablejs'
import { INITIAL_STATE } from '../core'

// just for hello world
function hello(state = INITIAL_STATE.get('hello'), action) {
    switch(action.type) {
        default:
            return state
    }
}

//
function number(state = INITIAL_STATE.get('number'), action) {
    switch(action.type){
        case 'INCREMENT':
            return state + 1

        default:
            return state
    }
}

const rootReducer = combineReducers({
    hello,
    number,
})

export default rootReducer