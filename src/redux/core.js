/* @flow */
import { List, Map, Record, fromJS } from 'immutable' // eslint-disable-line no-unused-vars

export type ListOfTasks = {
    items: [],
}

export const ListOfTasksRecord = Record({
    items: new List(),
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
    // task:       Task,
    items:      ListOfTasks,
}

export const AppStateRecord = Record( {
    // task:       new TaskRecord(),
    listOfTasks:   new ListOfTasksRecord(),
    math:       new MathRecord(),
})

export const INITIAL_STATE = new AppStateRecord()

export function incrementValue(state: MathRecord): MathRecord {
    return state.set("value", state.get("value") + 1 )
}

export function addToList(state: ListOfTasksRecord, task: string): ListOfTasksRecord {

    return state.update("items", items => items.push(task) )
    // return state.set('items', [ 'is this working' ])
}




// export function setTask(state: Task, task: string): TaskRecord {
//     return new TaskRecord(task)
// }

// export function updateGreeting(state: HelloRecord, value: string): HelloRecord {
//     return state.set("greeting", value)
// }

