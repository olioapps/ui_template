import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers/root_reducer'
import client from '../api/apollo_client'

const sagaMiddleware = createSagaMiddleware()

const logger = createLogger({
    stateTransformer: (state) => state.toJS(),
})

// We add the apollo middleware to our stack
const middleware = [ logger, sagaMiddleware, client.middleware() ]

const createStoreWithMiddleware = applyMiddleware.apply(this, middleware)(createStore)
const store = createStoreWithMiddleware(rootReducer)

export default store