import { combineReducers } from 'redux-immutablejs'
import { INITIAL_STATE } from '../core'

// just for hello world
function hello(state = INITIAL_STATE.get('hello'), action) {
    switch(action.type) {
        default:
            return state
    }
}

const rootReducer = combineReducers({
    hello,
})

export default rootReducer