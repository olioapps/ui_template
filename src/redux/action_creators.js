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