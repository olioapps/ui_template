import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../redux/action_creators'



class SideMenu extends Component {
    constructor(props) {
        super(props)

        this.newList = this.newList.bind(this)
        this.saveList = this.saveList.bind(this)
        this.clearList = this.clearList.bind(this)

        this.state = {
            listName: '',
        }
    }

    newList(event){
        this.setState({ listName: event.target.value })
    }

    saveList(){
        this.props.addList(this.state.listName)
        this.clearList()
    }

    clearList(){
        this.setState({ listName: '' })
    }

    render() {

        // const list = this.props.list.name.map( listName => <div>{listName}</div>)

        return (
            <div>

                <h3>User</h3>
                <h6>My lists... </h6>
                <h3>{this.props.list.names}</h3>
                <input type="text" placeholder="Enter new list name" value={this.state.listName} onChange={this.newList}/>
                <button onClick={this.saveList}>Save</button>
                <button onClick={this.clearList}>Clear</button>
                <br/>
                <button> Edit </button>
                <button onClick={this.addList}> New List </button>
            </div>
        )
    }
}

export default connect( state => state.toJSON(), actionCreators )(SideMenu)