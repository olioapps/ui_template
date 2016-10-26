import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../redux/action_creators'

class Task extends Component {

    constructor(props) {
        super(props)

        this.setEditMode = this.setEditMode.bind(this)
        this.changeName = this.changeName.bind(this)
        this.saveEdit = this.saveEdit.bind(this)


        this.state = {
            editMode: false,
            taskName: props.task.label,
        }
    }

    setEditMode(bool) {
        return () => this.setState({editMode: bool})
    }

    changeName(e) {
        this.setState({ taskName: e.target.value })
    }

    saveEdit() {
        debugger
        this.props.updateTaskSave(this.props.currentListId, this.props.task.id, this.state.taskName )
        // this.setEditMode(false)
    }

    render() {

        return (
            <div>

                <input type="checkbox"/>
                {this.state.editMode
                    ? <input autoFocus value={this.state.taskName} onChange={this.changeName} />
                    : <span>{this.props.task.label} </span>}
                {this.state.editMode
                    ? <button onClick={this.saveEdit}> Save </button>
                    : <button onClick={this.setEditMode(true)}> Edit </button>}

                <button> Delete </button>

            </div>
        )
    }
}

export default connect( state => state.toJSON(), actionCreators )(Task)