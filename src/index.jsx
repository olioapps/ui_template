import React                                           from 'react'
import ReactDOM                                        from 'react-dom'
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router'
import { createHashHistory }                           from 'history'
import store                                           from './redux/store'
import * as appMap                                     from './app_map'
import App                                             from './app'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

const router = (
    <Router history={appHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={appMap.pages.helloWorld.component} {...appMap.buildProps('helloWorld') } />
            {appMap.routes()}
        </Route>
    </Router>
)


const client = new ApolloClient({
    networkInterface: createNetworkInterface({ uri: 'http://127.0.0.1:5000/graphql' }),
})

ReactDOM.render(
    <ApolloProvider client={client} store={store}>
        {router}
    </ApolloProvider>,
    document.getElementById('root')
)