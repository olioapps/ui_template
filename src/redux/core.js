/* @flow */
import { List, Map, Record, fromJS } from 'immutable' // eslint-disable-line no-unused-vars


export type ListOfTasks = {
    items: [],
}


export const ListOfTasksRecord = Record({
    items: new List(),
})


export type AppState = {
    currentList: string,
    tasks: Map<ListOfTasksRecord>,
}


export const AppStateRecord = Record( {
    currentList: '',
    tasks: new Map(),
})

export const INITIAL_STATE = new AppStateRecord()


export function addList(state, listName){
    return state.set(listName, new ListOfTasksRecord() )
}




export function addToList(state: ListOfTasksRecord, task: string): ListOfTasksRecord {
    return state.update("items", items => items.push(task) )
}


export function saveList(state: TodoListRecord, listName: string): TodoListRecord {
    return state.update("names", names => names.push(listName) )
}




// export function setTask(state: Task, task: string): TaskRecord {
//     return new TaskRecord(task)
// }

// export function updateGreeting(state: HelloRecord, value: string): HelloRecord {
//     return state.set("greeting", value)
// }

