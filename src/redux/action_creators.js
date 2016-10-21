export function addNumber() {
    return {
        type: 'INCREMENT',
    }
}
export function setGreeting(greeting) {
    return {
        type: 'SET_GREETING',
        greeting: greeting,
    }
}
export function addTask(taskString) {
    return {
        type: 'ADD_TASK',
        taskString, 
    }
}
export function addList(listNameString) {
    return {
        type: 'ADD_LIST',
        listNameString,
    }
}