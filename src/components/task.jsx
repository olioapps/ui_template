import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../redux/action_creators'
import HelpText from './help_text'


class Task extends Component {

    constructor(props) {
        super(props)

        this.setEditMode = this.setEditMode.bind(this)
        this.changeName = this.changeName.bind(this)
        this.saveEdit = this.saveEdit.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
        this.checkToggle = this.checkToggle.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.handleClear = this.handleClear.bind(this)


        this.state = {
            editMode: false,
            taskName: props.task.label,
            showHelp: false,
        }

        console.log('task name: ' + this.state.taskName)

    }

    setEditMode(bool) {
        return () => this.setState({editMode: bool})
    }

    changeName(e) {
        this.setState({taskName: e.target.value})
        console.log(this.state.taskName)
        this.setState({showHelp: false})
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            console.log("enter key pressed")
            this.saveEdit()
        }
    }

    handleClear() {
        this.setState({taskName: ""})
    }

    saveEdit() {
        if (this.state.taskName !== '') {
            this.props.updateTaskSave(this.props.currentListId, this.props.task.id, this.state.taskName)
            this.setEditMode(false)()
        } else {
            this.setState({showHelp: true})
        }

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
            <div>
                <ul id="task">
                    <input type="checkbox" checked={this.props.task.completed} onChange={this.checkToggle}/>
                    {this.state.editMode
                        ? <input type="text" ref={ref => ref.focus()} value={this.state.taskName} onKeyPress={this.handleKeyPress}
                                 onChange={this.changeName}/>
                        : <li style={{textDecoration: textStyle, color: colorStyle }}>{this.props.task.label}</li>
                    }

                    <div className="btnContainer">
                        {this.state.editMode
                            ? <button onClick={this.saveEdit}><i className="fa fa-check"/></button>
                            : <button onClick={this.setEditMode(true)}><i className="fa fa-pencil"/>
                        </button>}

                        {this.state.editMode
                            ? <button onClick={this.handleClear}><i className="fa fa-times"/></button>  // clear input field
                            : <button onClick={this.deleteTask}><i className="fa fa-times"/></button>  // delete task
                        }
                    </div>
                </ul>
                { this.state.showHelp ? <HelpText /> : null }
            </div>
        )
    }
}

export default connect(state => state.toJSON(), actionCreators)(Task)