// @flow
import 'whatwg-fetch'
import { resolve } from 'url'
import { formatQueryParams } from '../util/api_utils'
import store from '../redux/store'

export const apiHost = 'https://olioapps.io/v1/'

type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE'

export function fetchify(path: string): Function {
    return (method: MethodType) => (body: Object, queryParams: Object, headers: Object) => {
        const url = resolve(apiHost, path) + formatQueryParams(queryParams)
        return fetch(url, {
            method: method,
            body: body ? JSON.stringify(body) : null,
            headers: getHeaders(headers),
        })
    }
}

function getHeaders(otherHeaders: Object = {}): Object {
    const jwt = store.getState().getIn(['session', 'jwt'])
    const authHeaders = jwt ? { 'Authorization': `Bearer ${jwt}` } : {}
    const headers = Object.assign({}, otherHeaders, authHeaders, {'accept': 'application/json'})
    return headers
}