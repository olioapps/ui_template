import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../redux/action_creators'

class List extends Component {

    constructor(props) {
        super(props)

        this.changeName = this.changeName.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.saveEdit = this.saveEdit.bind(this)
        this.setEditMode = this.setEditMode.bind(this)
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
        this.setEditMode(false)()
    }

    setEditMode(bool) {
        return () => this.setState({editMode: bool})
    }
    deleteList() {
        this.props.deleteList(this.props.currentListId)
        this.setEditMode(false)()
    }

    render() {
        
        return (
            <ul id="list">
                {this.state.editMode
                    ? <input type="text" autoFocus value={this.state.listName} onKeyPress={this.handleKeyPress}
                             onChange={this.changeName}/>
                    : <li key={this.props.listItem.id} onClick={()=> this.props.setCurrentListID(this.props.listItem.id)}>
                    {this.props.listItem.name}
                    <span>{this.props.listItem.count}</span>
                </li>
                }
                < div className="btnContainer">
                {this.state.editMode
                    ? <button onClick={this.saveEdit}><i className="fa fa-check"/></button> 
                    : <button onClick={this.setEditMode(true)}><i className="fa fa-pencil"/> 
                </button>}
                {this.state.editMode
                    ? <button><i className="fa fa-times"/></button>
                    : <button onClick={this.deleteList}><i className="fa fa-times"/></button>
                }
            </div>

            </ul>
        )

    }
}

export default connect(state => state.toJSON(), actionCreators)(List)
