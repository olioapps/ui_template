// @flow

import { fetchify } from './api'
import { fetchThen, handleResp } from '../util/api_utils'

const patientsEndpoint = fetchify('/patients')

export const getPatients = fetchThen(
    patientsEndpoint('GET')(null), handleResp(200)
)