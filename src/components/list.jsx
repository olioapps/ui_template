import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../redux/action_creators'
import ListOptions from './list_options'


class List extends Component {

    constructor(props) {
        super(props)

        this.changeName = this.changeName.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.saveEdit = this.saveEdit.bind(this)
        this.setListEditMode = this.setListEditMode.bind(this)
        this.listDelete = this.listDelete.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.incompleteCount = this.incompleteCount.bind(this)

        this.renderInput = this.renderInput.bind(this)
        this.renderListOptions = this.renderListOptions.bind(this)
        this.renderListNameCount = this.renderListNameCount.bind(this)


        this.state = {
            listName: props.listItem.name,
            editMode: false,
            showHelp: false,
        }
    }

    handleClear() {
        this.setState({listName: ""})
    }

    changeName(e) {
        this.setState({listName: e.target.value})
        this.setState({showHelp: false})
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.saveEdit()
        }
    }

    saveEdit() {
        if (this.state.listName !== '') {
            this.props.updateListName(this.props.listItem.id, this.state.listName)
            this.setListEditMode(false)
            this.refs.editInputField.style.borderColor = "rgb(232, 232, 232)"
            this.refs.editInputField.placeholder = "Enter New Task"
        } else {
            this.setState({showHelp: true})
            this.refs.editInputField.placeholder = "Cannot be empty"
            this.refs.editInputField.style.borderColor = "#fbb040"
            this.refs.editInputField.style.backgroundColor = "#FBECD5"
            this.refs.editInputField.style.borderSize = '5px'
        }
    }

    setListEditMode() {
        this.setState({editMode: !this.state.editMode})
    }

    listDelete() {
        this.props.deleteList(this.props.listItem.id)
    }

    incompleteCount() {
        const incompleteTasks = this.props.listItem.tasks.filter(task => task.completed === false)
        return !this.props.revealOptionsBool ? <span className="incompleteCount">{incompleteTasks.length}</span> : null
    }

    renderInput() {
        return (
            <input type="text"
                   ref="editInputField"
                   autoFocus value={this.state.listName}
                   onKeyPress={this.handleKeyPress}
                   onChange={this.changeName}
                    placeholder=""/>
        )
    }

    renderListNameCount() {
        return (
            <span key={this.props.listItem.id} onClick={()=> this.props.setCurrentListID(this.props.listItem.id)}>
                {this.props.listItem.name}
                {this.incompleteCount()}
            </span>
        )
    }

    renderListOptions() {
        return (
            <ListOptions editMode={this.state.editMode}
                         handleClear={this.handleClear}
                         setListEditMode={this.setListEditMode}
                         saveEdit={this.saveEdit}
                         listDelete={this.listDelete}/>
        )
    }


    render() {

        return (
            <li>
                <div>
                    {this.state.editMode
                        //true//
                        ? this.renderInput()
                        : this.renderListNameCount()
                    }
                    {this.props.revealOptionsBool
                        ? this.renderListOptions()
                        : null
                    }
                </div>

            </li>
        )

    }
}

export default connect(state => state.toJSON(), actionCreators)(List)
