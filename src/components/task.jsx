import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../redux/action_creators'


class Task extends Component {
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

                <input type="checkbox"/>
                <span>Task</span>
                <button> Edit </button>
                <button> Delete </button>
                <br/>
                <button>New Task Button</button>
            </div>
        )
    }
}

export default connect( state => state.toJSON(), actionCreators )(Task)