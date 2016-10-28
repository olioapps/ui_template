import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../redux/action_creators'


class SideMenu extends Component {
    constructor(props) {
        super(props)

        this.newList = this.newList.bind(this)
        this.saveList = this.saveList.bind(this)
        this.clearList = this.clearList.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.renderNormal = this.renderNormal.bind(this)
        this.renderAddList = this.renderAddList.bind(this)
        this.toggleEditListMode = this.toggleEditListMode.bind(this)
        this.toggleEditMode = this.toggleEditMode.bind(this)
        this.toggleAddMode = this.toggleAddMode.bind(this)


        this.state = {
            listName: '',
            editListMode: false,
            editMode: false,
            addMode: true,
        }
    }

    id() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1)
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4()
    }

    newList(event) {
        this.setState({listName: event.target.value})
    }

    toggleEditListMode() {
        this.setState({editListMode: !this.state.editListMode})
    }

    toggleEditMode() {
        this.setState({editMode: !this.state.editMode})
    }

    toggleAddMode() {
        if(this.state.editListMode) { this.toggleEditListMode() }

        this.setState({addMode: !this.state.addMode})
    }


    saveList() {
        const id = this.id()
        this.props.addList(this.state.listName, id)
        this.props.setCurrentListID(id)
        this.clearList()
        this.toggleAddMode()
    }


    handleKeyPress(e) {
        if (e.key === 'Enter') {
            console.log("enter key pressed")
            this.saveList()
        }
    }


    clearList() {
        this.setState({listName: ''})
    }

    renderAddList(listNames) {
        const displayLists = this.props.currentListId !== ''
        const lists = (displayLists) ? listNames : ''
        return (
            <div id="sideMenu">
                <h3>User</h3>
                <h6>My Lists: </h6>
                <ul>{lists}</ul>
                <div className="btnContainer">
                    <input autoFocus type="text" placeholder="Enter new list name" value={this.state.listName}
                           onChange={this.newList} onKeyPress={this.handleKeyPress}/>
                    <button onClick={this.saveList}><i className="fa fa-check" aria-hidden="true"></i></button>
                    <button onClick={this.clearList}><i className="fa fa-times" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        )
    }

    renderNormal(listNames) {
        return (
            <div id="sideMenu">
                <h3>User</h3>
                <h6>My Lists: </h6>
                <ul id="lists">
                    {listNames}
                </ul>
                <br/>
                <div className="btnContainer">
                    <button onClick={this.toggleEditListMode}>Edit</button>
                    <button onClick={this.toggleAddMode}> New List</button>
                </div>
            </div>
        )
    }

    render() {
        const editingListMode = this.state.editListMode
        const editingMode = this.state.editMode

        let buttons = null

        if(editingListMode) {
            buttons =
                <div>
                    <button onClick={this.toggleEditMode}><i className="fa fa-pencil" aria-hidden="true"></i></button>
                    <button><i className="fa fa-times" aria-hidden="true"></i></button>
                </div>
        }

        if(editingMode) {
            buttons =
                <div>
                    <button><i className="fa fa-check" aria-hidden="true"></i></button>
                    <button><i className="fa fa-times" aria-hidden="true"></i></button>
                </div>
        }
        
        // {this.state.editMode
        //     ? <input type="text" autoFocus value={this.state.taskName} onKeyPress={this.handleKeyPress} onChange={this.changeName}  />
        //     // : <li style={this.props.style}>{this.props.task.label}</li>
        //     : <li style={{textDecoration: textStyle, color: colorStyle }}>{this.props.task.label}</li>
        // }


        const listNames = this.props.catalog.map((list) =>
            <li key={list.id} onClick={()=> this.props.setCurrentListID(list.id)} >
                {list.name}
                <span>{list.count}</span>
                <span>{buttons}</span>
            </li>
        )

        if (this.state.addMode === true) {
            return this.renderAddList(listNames)
        }
        else {
            return this.renderNormal(listNames)
        }
    }
}


export default connect(state => state.toJSON(), actionCreators)(SideMenu)