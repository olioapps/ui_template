// @flow

import { compose } from 'redux'

function prefix(i) {
    return i === 0 ? '?' : '&'
}

function formatQueryParams(params: Object = {}) {
    const paramKeys = Object.keys(params)
    if (paramKeys.length === 0) return ''
    return paramKeys.reduce((acc, c, i) => params[c] ? acc + `${prefix(i)}${c}=${params[c]}` : acc, '')
}

function fetchThen(apiCall: Function, respHandler: Function): Function {
    return compose(promise => promise.then(resp => respHandler(resp), e => respHandler(e)), apiCall)
}

function handleResp(successCode: number): Function {
    return resp => resp.status === successCode ? resp.json() : handleErrorResp(resp)
}

function handleErrorResp(resp) {
    // TBD
}

export {
    fetchThen,
    formatQueryParams,
    handleResp,
}