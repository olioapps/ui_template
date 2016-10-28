import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../redux/action_creators'

class Task extends Component {

    constructor(props) {
        super(props)

        this.setEditMode = this.setEditMode.bind(this)
        this.changeName = this.changeName.bind(this)
        this.saveEdit = this.saveEdit.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
        this.checkToggle = this.checkToggle.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)

        this.state = {
            editMode: false,
            taskName: props.task.label,
        }
    }

    setEditMode(bool) {
        return () => this.setState({editMode: bool})
    }

    changeName(e) {
        this.setState({taskName: e.target.value})

    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            console.log("enter key pressed")
            this.saveEdit()
        }
    }


    saveEdit() {
        this.props.updateTaskSave(this.props.currentListId, this.props.task.id, this.state.taskName)
        this.setEditMode(false)()
    }

    deleteTask() {
        this.props.updateTaskDelete(this.props.currentListId, this.props.task.id)
    }

    checkToggle() {
        this.props.checkToggle(this.props.currentListId, this.props.task.id, !this.props.task.completed)
    }

    render() {
        const textStyle = this.props.task.completed ? 'line-through' : "none"
        const colorStyle = this.props.task.completed ? 'grey' : "inherit"

        return (

            <ul id="task">
                <input type="checkbox" checked={this.props.task.completed} onChange={this.checkToggle}/>
                {this.state.editMode
                    ? <input type="text" autoFocus value={this.state.taskName} onKeyPress={this.handleKeyPress}
                             onChange={this.changeName}/>
                    // : <li style={this.props.style}>{this.props.task.label}</li>
                    : <li style={{textDecoration: textStyle, color: colorStyle }}>{this.props.task.label}</li>

                }

                <div className="btnContainer">
                    {this.state.editMode
                        ? <button onClick={this.saveEdit}><i className="fa fa-check" aria-hidden="true"></i></button>
                        : <button onClick={this.setEditMode(true)}><i className="fa fa-pencil" aria-hidden="true"></i>
                    </button>}
                    <button onClick={this.deleteTask}><i className="fa fa-times" aria-hidden="true"></i>
                    </button>
                </div>

            </ul>
        )
    }
}

export default connect(state => state.toJSON(), actionCreators)(Task)