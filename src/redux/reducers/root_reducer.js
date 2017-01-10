import { combineReducers } from 'redux-immutablejs'
import { INITIAL_STATE, incrementValue, updateGreeting } from '../core'
import client from '../../api/apollo_client'

// just for hello world
function hello(state = INITIAL_STATE.get("hello"), action) {
    switch(action.type) {
        case 'SET_GREETING':
            return updateGreeting(state, action.greeting)
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

// We incoorporate the Apollo reducer into our store
const apollo = client.reducer()

const rootReducer = combineReducers({
    hello,
    math,
    apollo,
})

export default rootReducer