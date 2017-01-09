import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers/root_reducer'
import client from '../api/client'

const sagaMiddleware = createSagaMiddleware()

const logger = createLogger({
    stateTransformer: (state) => state.toJS(),
})

const middleware = [ logger, sagaMiddleware, client.middleware() ]

const createStoreWithMiddleware = applyMiddleware.apply(this, middleware)(createStore)
const store = createStoreWithMiddleware(rootReducer)

export default store