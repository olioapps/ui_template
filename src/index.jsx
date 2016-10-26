import React                                           from 'react'
import ReactDOM                                        from 'react-dom'
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router'
import { createHashHistory }                           from 'history'
import { Provider }                                    from 'react-redux'
import store                                           from './redux/store'
import * as appMap                                     from './app_map'
import App                                             from './app'
import './assets/vendor/normalize.css'
import './assets/vendor/bootstrap-3.3.7-dist 2/css/bootstrap.min.css'
import './assets/vendor/font-awesome.min.css'
import './assets/base.scss'
import './assets/layout.scss'
import './assets/modules.scss'

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

const router = (
    <Router history={appHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={appMap.pages.todoApp.component} {...appMap.buildProps('todoApp') } />
            {appMap.routes()}
        </Route>
    </Router>
)

ReactDOM.render(
    <Provider store={store}>
        {router}
    </Provider>,
    document.getElementById('root')
)