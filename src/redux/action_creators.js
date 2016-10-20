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
    debugger
    return {
        type: 'ADD_TASK',
        taskString, 
    }
}