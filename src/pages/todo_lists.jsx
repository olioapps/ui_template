import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { compose } from 'redux'
import * as mutations from '../api/mutations'
import * as queries from '../api/queries'

// TodoList is a "presentational" or apollo-unaware component,
// It could be a simple React class:
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

    toggleAddTodoItemInput(id) {
        return () => this.setState({addTodoItem: !this.state.addTodoItem, todoListId: id})
    }

    toggleAddTodoListInput() {
        return () => this.setState({addTodoList: !this.state.addTodoList})
    }

    toggleEditTodoListInput(id) {
        return () => {
            this.setState({editTodoListInput: !this.state.editTodolistInput, editInputId: id})
        }
    }

    toggleEditTodoItemInput(id, todoListId) {
        return () => this.setState({editTodoItemInput: !this.state.editTodoItemInput, editInputId: id, todoListId: todoListId})
    }

    setText(e) {
        this.setState({text: e.nativeEvent.target.value})
    }

    renameTodoList(id) {
        return () => {
            this.props.renameTodoList({variables: {id: id, name: this.state.text}}).then(this.props.data.refetch)
            this.toggleEditTodoListInput(null)()
        }
    }

    renameTodoItem(id) {
        return () => {
            this.props.renameTodoItem({variables: {id: id, name: this.state.text}}).then(this.props.data.refetch)
            this.toggleEditTodoItemInput(null, null)()
        }
    }

    addTodoList() {
        return () => {
            this.props.addTodoList({variables: {name: this.state.text}}).then(this.props.data.refetch)
            this.toggleAddTodoListInput()()
        }
    }

    addTodoItem() {
        return () => {
            this.props.addTodoItem({variables: {todoListId: this.state.todoListId, name: this.state.text}}).then(this.props.data.refetch)
            this.toggleAddTodoItemInput(null)()
        }
    }

    deleteTodoList(todoListId) {
        return () => this.props.deleteTodoList({variables: {id: todoListId}}).then(this.props.data.refetch)
    }

    deleteTodoItem(todoItemId) {
        return () => this.props.deleteTodoItem({variables: {id: todoItemId}}).then(this.props.data.refetch)
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
                {addTodoList ? this.renderNameInput() : <button onClick={this.toggleAddTodoListInput()}>add todo list</button>}
                <ul>
                    {listOfTodoLists.map((todoList, i) => this.renderTodoList(todoList, i))}
                </ul>
            </div>
        )
    }
}

// We then can use `graphql` to pass the query results returned by MyQuery
// to TodoList as a prop (and update them as the results change)
// export const TodoListWithQuery = graphql(allEmployees)(TodoList)

const addQueriesMutations = compose(
    graphql(mutations.renameTodoListMutation, {name: 'renameTodoList'}),
    graphql(mutations.addTodoListMutation, {name: 'addTodoList'}),
    graphql(mutations.addTodoItemMutation, {name: 'addTodoItem'}),
    graphql(mutations.deleteTodoListMutation, {name: 'deleteTodoList'}),
    graphql(mutations.deleteTodoItemMutation, {name: 'deleteTodoItem'}),
    graphql(queries.allTodoLists),
)

const withQueryAndMutations = addQueriesMutations(TodoList)

const TodoListLinked = connect(
  state => state.toJSON(),
)(withQueryAndMutations)

export default TodoListLinked