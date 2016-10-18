/* @flow */
import { List, Map, Record, fromJS } from 'immutable' // eslint-disable-line no-unused-vars

export const AppStateRecord = Record( {
    hello: "hello olio",
    number: 1,  // moved number into redux core.js
})

export const INITIAL_STATE = new AppStateRecord()