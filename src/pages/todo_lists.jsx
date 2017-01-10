import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { compose } from 'redux'
import * as mutations from '../api/mutations'
import * as queries from '../api/queries'

// TodoList is a "presentational" or apollo-unaware component.
// Through the wrappers below, we pass down apollo client functions
// the component can then call directly.

class TodoList extends Component {
    constructor(props) {
        super(props)
        this.toggleEditTodoListInput = this.toggleEditTodoListInput.bind(this)
        this.renameTodoList = this.renameTodoList.bind(this)
        this.setText = this.setText.bind(this)
        this.toggleEditTodoItemInput = this.toggleEditTodoItemInput.bind(this)
        this.toggleAddTodoListInput = this.toggleAddTodoListInput.bind(this)
        this.addTodoList = this.addTodoList.bind(this)
        this.toggleAddTodoItemInput = this.toggleAddTodoItemInput.bind(this)
        this.deleteTodoList = this.deleteTodoList.bind(this)
        this.deleteTodoItem = this.deleteTodoItem.bind(this)

        this.state = {
            editTodoListInput: false,
            editTodoItemInput: false,
            editInputId: null,
            todoListId: null,
            text: '',
            addTodoList: false,
            addTodoItem: false,
        }
    }

    toggleAddTodoListInput() {
        return this.setState({addTodoList: !this.state.addTodoList})
    }

    toggleAddTodoItemInput(id) {
        return () => this.setState({addTodoItem: !this.state.addTodoItem, todoListId: id})
    }

    toggleEditTodoListInput(id) {
        return () => this.setState({editTodoListInput: !this.state.editTodolistInput, editInputId: id})
    }

    toggleEditTodoItemInput(id, todoListId) {
        return () => this.setState({editTodoItemInput: !this.state.editTodoItemInput, editInputId: id, todoListId: todoListId})
    }

    setText(e) {
        this.setState({text: e.nativeEvent.target.value})
    }

    renameTodoList(id) {
        return () => this.props.renameTodoList({variables: {id: id, name: this.state.text}})
            .then(this.toggleEditTodoListInput(null))
    }

    renameTodoItem(id) {
        return () => this.props.renameTodoItem({variables: {id: id, name: this.state.text}})
            .then(this.toggleEditTodoItemInput(null, null))
    }

    addTodoList() {
        return () => this.props.addTodoList({
            variables: {name: this.state.text},
            updateQueries: {
                allTodoLists: (prev, { mutationResult }) => {
                    const newList = mutationResult.data.createTodoList
                    // these aren't catching for some reason (I suspect it's not firing at all)
                    debugger
                    return {
                        ...prev,
                        edges: [...prev.edges, newList],
                    }
                },
            },
        })
        .then(this.toggleAddTodoListInput)
    }

    addTodoItem() {
        return () => this.props.addTodoItem({variables: {todoListId: this.state.todoListId, name: this.state.text}})
            .then(this.toggleAddTodoItemInput(null))
    }

    deleteTodoList(todoListId) {
        return () => this.props.deleteTodoList({
            variables: {id: todoListId},
            updateQueries: {
                allTodoLists: (prev, { mutationResult }) => {
                    const toDelete = mutationResult.data.createTodoList
                    // these aren't catching for some reason (I suspect it's not firing at all)
                    debugger
                    return {
                        ...prev,
                        edges: prev.edges.filter(e => e.id !== toDelete.id),
                    }
                },
            },
        })
    }

    deleteTodoItem(todoItemId) {
        return () => this.props.deleteTodoItem({variables: {id: todoItemId}})
    }

    renderNameInput(id, todoListId) {
        const { addTodoList, addTodoItem } = this.state
        return (
            <div>
                <input type="text" placeholder="Enter new name" autoFocus="true" onChange={(e) => this.setText(e)} />
                <button onClick={todoListId ? this.renameTodoItem(id) : (addTodoList ? this.addTodoList() : (addTodoItem ? this.addTodoItem() : this.renameTodoList(id)))}>save</button>
            </div>
        )
    }

    renderTodoItems(todos) {
        const { editTodoItemInput, editInputId, todoListId } = this.state
        return (
            todos.map((todo, i) => {
                const todoId = parseInt(atob(todo.node.id).split(':')[1], 10)
                return (
                    <li key={i}>
                        <div>
                            {todo.node.name}
                            {editTodoItemInput && editInputId === i && todoListId === todo.node.todoListId ? this.renderNameInput(todoId, todo.node.todoListId) : <button onClick={this.toggleEditTodoItemInput(i, todo.node.todoListId)}>edit</button>}
                            <button onClick={this.deleteTodoItem(todoId)}>delete</button>
                        </div>
                    </li>
                )
            })
        )
    }

    renderTodoList(todoList, i) {
        const { editTodoListInput, editInputId, addTodoItem } = this.state
        const todoListId = parseInt(atob(todoList.node.id).split(':')[1], 10)

        return (
             <li key={todoList.node.name + '-' + i}>
                <div>
                    {todoList.node.name}
                    {editTodoListInput && editInputId === i ? this.renderNameInput(todoListId) : (<button onClick={this.toggleEditTodoListInput(i)}>edit</button>)}
                    {addTodoItem && todoListId === this.state.todoListId ? this.renderNameInput() : (<button onClick={this.toggleAddTodoItemInput(todoListId)}>add todo item</button>)}
                    <button onClick={this.deleteTodoList(todoListId)}>delete</button>
                    <div>
                        <ul>
                            {this.renderTodoItems(todoList.node.todos.edges)}
                        </ul>
                    </div>
                </div>
            </li>
        )
    }

    renderLoading() {
        return (<div>Loading</div>)
    }

    renderError(error) {
        console.log(error)
        return (
            <div>
                An unexpected error occurred
                <span>{error}</span>
            </div>
        )
    }

    render() {
        const { addTodoList } = this.state
        const { allTodoLists } = this.props.data
        const listOfTodoLists = allTodoLists ? allTodoLists.edges : []

        if (this.props.data.loading) {
            return this.renderLoading()
        }

        if (this.props.data.error) {
            return this.renderError(this.props.data.error)
        }

        return (
            <div>
                {addTodoList ? this.renderNameInput() : <button onClick={this.toggleAddTodoListInput}>add todo list</button>}
                <ul>
                    {listOfTodoLists.map((todoList, i) => this.renderTodoList(todoList, i))}
                </ul>
            </div>
        )
    }
}

// Each call of `graphql` takes a defined mutation or a query returns a wrapper component.
// That wrapper will pass down the mutation/query function and the data returned
// from said api call. Each wrapper will keep track of it's own state (fetching, errors, etc.)
// Since we want access to all these api functions, we compose a master wrapper component, which
// creates a layer for each query/mutation.

const addQueriesMutations = compose(
    graphql(mutations.renameTodoListMutation, {name: 'renameTodoList'}),
    graphql(mutations.renameTodoItemMutation, {name: 'renameTodoItem'}),
    graphql(mutations.addTodoListMutation, {name: 'addTodoList'}),
    graphql(mutations.addTodoItemMutation, {name: 'addTodoItem'}),
    graphql(mutations.deleteTodoListMutation, {name: 'deleteTodoList'}),
    graphql(mutations.deleteTodoItemMutation, {name: 'deleteTodoItem'}),
    graphql(queries.allTodoLists),
)


// We wrap the component in the above composed wrapper
const withQueryAndMutations = addQueriesMutations(TodoList)

// connect as usual
const TodoListLinked = connect(
  state => state.toJSON(),
)(withQueryAndMutations)

export default TodoListLinked