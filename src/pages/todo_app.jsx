import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../redux/action_creators'
import Task from '../components/task'

class TodoApp extends Component {
    constructor(props) {
        super(props)
        
        this.nextPage = this.nextPage.bind(this)

    }
    
    static get contextTypes() {
        return { router: React.PropTypes.object.isRequired }
    }

    nextPage() {
        this.context.router.push('/editGreeting')
    }

    render() {
        return (
            <div>
                <h1>Hi I'm working</h1>
                <Task />
            </div>
        )
    }
}

export default connect( state => state.toJSON(), actionCreators )(TodoApp)