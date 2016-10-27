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
        this.renderEdit = this.renderEdit.bind(this)
        this.toggleEditMode = this.toggleEditMode.bind(this)


        this.state = {
            listName: '',
            editMode: false,
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

    toggleEditMode() {
        this.setState({editMode: !this.state.editMode})

    }

    saveList() {
        const id = this.id()
        this.props.addList(this.state.listName, id)
        this.props.setCurrentListID(id)
        this.clearList()
        this.toggleEditMode()
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

    renderNormal(listNames) {

        return (
            <div id="sideMenu">

                <h3>User</h3>
                <h6>My Lists: </h6>
                <ul>{listNames}</ul>

                <br/>
                <div className="btnContainer">
                    <button onClick={this.toggleEditMode}>Edit</button>
                    <button onClick={this.addList}> New List</button>
                </div>

            </div>
        )

    }

    renderEdit(listNames) {

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

    render() {
        const listNames = this.props.catalog.map((list) =>
            <li
                key={list.id}
                onClick={()=> this.props.setCurrentListID(list.id)}
            >{list.name}</li>)



        if (this.state.editMode === false) {
            return this.renderEdit(listNames)
        }
        else {
            return this.renderNormal(listNames)
        }



    }
}

export default connect(state => state.toJSON(), actionCreators)(SideMenu)