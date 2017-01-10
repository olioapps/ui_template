import React                                           from 'react'
import ReactDOM                                        from 'react-dom'
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router'
import { createHashHistory }                           from 'history'
import store                                           from './redux/store'
import * as appMap                                     from './app_map'
import App                                             from './app'
import { ApolloProvider }                              from 'react-apollo'
import client                                          from './api/apollo_client'

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

const router = (
    <Router history={appHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={appMap.pages.helloWorld.component} {...appMap.buildProps('helloWorld') } />
            {appMap.routes()}
        </Route>
    </Router>
)

// ApolloProvider takes the place of our normal `react-redux` Provider
ReactDOM.render(
    <ApolloProvider client={client} store={store}>
        {router}
    </ApolloProvider>,
    document.getElementById('root')
)