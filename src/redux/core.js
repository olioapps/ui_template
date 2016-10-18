/* @flow */
import { List, Map, Record, fromJS } from 'immutable' // eslint-disable-line no-unused-vars

export type Hello = {
    greeting: string,
}

export const HelloRecord = Record({
    greeting: "hello olio",
})

export type Math = {
    value: number,
}

export const MathRecord = Record({
    value: 1,
})

export type AppState = {
    hello:      Hello,
    math:       Math,
}

export const AppStateRecord = Record( {
    hello:      new HelloRecord(),
    math:       new MathRecord(),
})

export const INITIAL_STATE = new AppStateRecord()

export function incrementValue(state: MathRecord): MathRecord {
    return state.set("value", state.get("value") + 1 )
}

export function updateGreeting(state: HelloRecord, value: string): HelloRecord {
    return state.set("greeting", value)
}

