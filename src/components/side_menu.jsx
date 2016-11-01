import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../redux/action_creators'
import List from './list'
import SideMenuOptions from './side_menu_options'


class SideMenu extends Component {
    constructor(props) {
        super(props)

        this.newList = this.newList.bind(this)
        this.saveList = this.saveList.bind(this)
        this.clearList = this.clearList.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.toggleEditListMode = this.toggleEditListMode.bind(this)
        this.toggleAddMode = this.toggleAddMode.bind(this)
        this.revealOptions = this.revealOptions.bind(this)

        this.state = {
            listName: '',
            editListMode: false,
            addMode: true,
            revealOptionsBool: false,
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

    newListComponent() {
        return <div className="btnContainer">
                        <input autoFocus type="text" placeholder="Enter new list name" value={this.state.listName}
                            onChange={this.newList} onKeyPress={this.handleKeyPress} />
                        <button onClick={this.saveList}><i className="fa fa-check" aria-hidden="true"></i></button>
                        <button onClick={this.toggleAddMode}><i className="fa fa-times" aria-hidden="true"></i></button>
                     </div>
    }

    revealOptions() {
        console.log("OPTIONS: ", this.state.revealOptionsBool)
        this.setState({revealOptionsBool: !this.state.revealOptionsBool})
    }

    render() {

        const lists = this.props.catalog.map((listItem, i) => {
            return <List key={i} listItem={listItem} clearList={this.clearList} revealOptionsBool={this.state.revealOptionsBool}/>  
        })


        // const incompleteTasks = lists.tasks.filter( task=> task.completed ===false).map((task, i) => <Task key={i} task={task}/>)
        // count = incompleteTasks.length()

        return (
            <div id="sideMenu">
                <h3>User</h3>
                <h6>My Lists: </h6>

                <ul id="list">
                {lists}
                </ul>

                {this.state.addMode
                    ? this.newListComponent()
                    : null
                }
                <SideMenuOptions revealOptionsBool={this.state.revealOptionsBool} revealOptions={this.revealOptions} toggleAddMode={this.toggleAddMode} />
            </div>
        )
        
    }
}


export default connect(state => state.toJSON(), actionCreators)(SideMenu)