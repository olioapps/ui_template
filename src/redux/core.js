/* @flow */
import { List, Map, Record, fromJS } from 'immutable' // eslint-disable-line no-unused-vars

export type list = {
    // items: [],
    name: string,
}

export const ListRecord = Record({
    name: "",
})


export type ListOfTasks = {
    items: [],
}

export const ListOfTasksRecord = Record({
    items: new List(),
})

export type AppState = {
    // task:       Task,
    items:      ListOfTasks,
}

export const AppStateRecord = Record( {
    // task:       new TaskRecord(),
    listOfLists:   new ListRecord(),
    listOfTasks:   new ListOfTasksRecord(),
})

export const INITIAL_STATE = new AppStateRecord()


export function addToList(state: ListOfTasksRecord, task: string): ListOfTasksRecord {

    return state.update("items", items => items.push(task) )
    // return state.set('items', [ 'is this working' ])
}

export function saveList(state: ListRecord, listName: string): ListRecord {

    return state.set("name", listName)
    // return state.update("items", items => items.push(task) )
    // return state.set('items', [ 'is this working' ])
}




// export function setTask(state: Task, task: string): TaskRecord {
//     return new TaskRecord(task)
// }

// export function updateGreeting(state: HelloRecord, value: string): HelloRecord {
//     return state.set("greeting", value)
// }

