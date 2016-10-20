/* @flow */
import { List, Map, Record, fromJS } from 'immutable' // eslint-disable-line no-unused-vars

export type Task = {
    task: string,
}

export const TaskRecord = Record({
    task: "",
})

export type Math = {
    value: number,
}

export const MathRecord = Record({
    value: 1,
})

export type AppState = {
    // hello:      Hello,
    math:       Math,
    task: Task,
}

export const AppStateRecord = Record( {
    task:       new TaskRecord(),
    math:       new MathRecord(),
})

export const INITIAL_STATE = new AppStateRecord()

export function incrementValue(state: MathRecord): MathRecord {
    return state.set("value", state.get("value") + 1 )
}

export function setTask(state: Task, task: string): TaskRecord {
    debugger
    return new TaskRecord(task)
}

// export function updateGreeting(state: HelloRecord, value: string): HelloRecord {
//     return state.set("greeting", value)
// }

