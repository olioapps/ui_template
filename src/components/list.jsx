import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../redux/action_creators'
import ListOptions from './list_options'
import HelpText from './help_text'


class List extends Component {

    constructor(props) {
        super(props)

        this.changeName = this.changeName.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.saveEdit = this.saveEdit.bind(this)
        this.setListEditMode = this.setListEditMode.bind(this)
        this.deleteList = this.deleteList.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.incompleteCount = this.incompleteCount.bind(this)



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
        if(this.state.listName !== '') {
            this.props.updateListName(this.props.listItem.id, this.state.listName)
            this.setListEditMode(false)
        } else {
            this.setState({showHelp: true})
        }
    }

    setListEditMode() {
        this.setState({editMode: !this.state.editMode})
    }
    deleteList() {
        this.props.deleteList(this.props.listItem.id)
        this.setListEditMode(false)
    }

    incompleteCount() {
        const incompleteTasks = this.props.listItem.tasks.filter( task => task.completed === false)
        return !this.props.revealOptionsBool ? <span className="incompleteCount">{incompleteTasks.length}</span> : null
    }

    render() {

        return (
                <div>
                    <li>
                    {this.state.editMode
                        //true//
                        ? <input type="text" autoFocus value={this.state.listName} onKeyPress={this.handleKeyPress}
                                 onChange={this.changeName}/>
                        : <span key={this.props.listItem.id} onClick={()=> this.props.setCurrentListID(this.props.listItem.id)}>
                            {this.props.listItem.name}
                            {this.incompleteCount()}
                          </span>
                    }

                    {this.props.revealOptionsBool
                        ? <ListOptions editMode={this.state.editMode} handleClear={this.handleClear} setListEditMode={this.setListEditMode} saveEdit={this.saveEdit}/>
                        : null
                    }

                    </li>
                    { this.state.showHelp ? <HelpText /> : null }

                </div>


        )

    }
}

export default connect(state => state.toJSON(), actionCreators)(List)
