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
        this.deleteList = this.deleteList.bind(this)


        this.state = {
            listName: props.listItem.name,
            editMode: false,
        }
    }

    changeName(e) {
        this.setState({listName: e.target.value})
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.saveEdit()
        }
    }

    saveEdit() {
        this.props.updateListName(this.props.currentListId, this.state.listName)
        this.setListEditMode(false)()
    }

    setListEditMode() {
        this.setState({editMode: !this.state.editMode})
    }
    deleteList() {
        this.props.deleteList(this.props.currentListId)
        this.setListEditMode(false)
    }

    render() {
        
        return (
            <ul id="list">
                <li>
                {this.state.editMode
                    //true//
                    ? <input type="text" autoFocus value={this.state.listName} onKeyPress={this.handleKeyPress}
                             onChange={this.changeName} />
                    //false//
                    : <span key={this.props.listItem.id} onClick={()=> this.props.setCurrentListID(this.props.listItem.id)}>
                        {this.props.listItem.name}
                        <span>{this.props.listItem.count}</span>
                    </span>
                }

                {this.props.revealOptionsBool
                    ? <ListOptions editMode={this.state.editMode} setListEditMode={this.setListEditMode}/>
                    : null
                }

                </li>
            </ul>
        )

    }
}

export default connect(state => state.toJSON(), actionCreators)(List)
