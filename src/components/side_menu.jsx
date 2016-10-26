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

    id() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1)
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4()
    }

    newList(event){
        this.setState({ listName: event.target.value })
    }

    saveList(){
        const id = this.id()
        this.props.addList(this.state.listName, id)
        this.props.setCurrentListID(id)
        this.clearList()
    }

    clearList(){
        this.setState({ listName: '' })
    }

    render() {
        const listNames = this.props.catalog.map((list) =>
            <button
                key={list.id}
                onClick={()=> this.props.setCurrentListID(list.id)}
        >{list.name}</button>)


        console.log(this.props.list)
        return (
            <div>

                <h3>User</h3>
                <h6>My lists... </h6>
                <h3>{listNames}</h3>
                <div className="btnContainer">
                    <input type="text" placeholder="Enter new list name" value={this.state.listName} onChange={this.newList}/>
                    <button onClick={this.saveList}>Save</button>
                    <button onClick={this.clearList}>Clear</button>
                </div>
                <br/>
                <button> Edit </button>
                <button onClick={this.addList}> New List </button>
            </div>
        )
    }
}

export default connect( state => state.toJSON(), actionCreators )(SideMenu)