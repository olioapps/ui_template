import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../redux/action_creators'
import List from './list'
import SideMenuOptions from './side_menu_options'
import Validate from './validate'
import { makeId } from '../util/utils'

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
        this.newListElement = this.newListElement.bind(this)

        this.state = {
            listName: '',
            editListMode: false,
            addMode: true,
            revealOptionsBool: false,
            showHelp: false,
        }
    }


    newList(event) {
        this.setState({listName: event.target.value})
        this.setState({showHelp: false})
    }

    toggleEditListMode() {
        this.setState({editListMode: !this.state.editListMode})
    }


    toggleAddMode() {
        if (this.state.editListMode) {
            this.toggleEditListMode()
        }
        this.setState({addMode: !this.state.addMode})
    }

    saveList() {
        if (this.state.listName !== '') {
            const id = makeId()
            this.props.addList(this.state.listName, id)
            this.props.setCurrentListID(id)
            this.clearList()
            this.toggleAddMode()
        }
        else {
            this.setState({showHelp: true})
        }
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.saveList()
        }
    }

    clearList() {
        this.setState({listName: ''})
    }

    revealOptions() {
        this.setState({revealOptionsBool: !this.state.revealOptionsBool})
    }

    newListElement() {
        return (
            <div>
                <div className="btnContainer">
                        <input
                            autoFocus
                            type="text"
                            placeholder="Enter new list name"
                            value={this.state.listName}
                            onChange={this.newList}
                            onKeyPress={this.handleKeyPress} />

                        <button onClick={this.saveList}><i className="fa fa-check" /></button>
                        <button onClick={this.toggleAddMode}><i className="fa fa-times" /></button>
                        <br/>
                     </div>

            </div>
        )
    }

    render() {
        const lists = this.props.catalog.map((listItem, i) => {
            return <List key={i}
                         listItem={listItem}
                         clearList={this.clearList}
                         revealOptionsBool={this.state.revealOptionsBool}/>
        })

        return (
            <div id="sideMenu">
                <h3>User</h3>
                <span>My Lists:
                <SideMenuOptions
                    revealOptionsBool={this.state.revealOptionsBool}
                    revealOptions={this.revealOptions}
                    toggleAddMode={this.toggleAddMode}
                    addMode={this.state.addMode}/>
                </span>
                <ul id="list">
                    {lists}
                </ul>

                {this.state.addMode
                    ? this.newListElement()
                    : null
                }
                { this.state.showHelp ? <Validate /> : null }
            </div>
        )
    }
}


export default connect(state => state.toJSON(), actionCreators)(SideMenu)