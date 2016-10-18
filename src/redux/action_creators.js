export function addNumber() {
    return {
        type: 'INCREMENT',
    }
}
export function setGreeting(val) {
    return {
        type: 'SET_GREETING',
        value: val,
    }
}