import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../redux/action_creators'
import TaskList from '../components/task_list'
import SideMenu from '../components/side_menu'

class TodoApp extends Component {

    static get contextTypes() {
        return { router: React.PropTypes.object.isRequired }
    }

    render() {
        return (
            <div>
                <h1>To Do App...</h1>
                <SideMenu />
                <TaskList />

            </div>
        )
    }
}

export default connect( state => state.toJSON(), actionCreators )(TodoApp)