import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'

// MyComponent is a "presentational" or apollo-unaware component,
// It could be a simple React class:
class MyComponent extends Component {
    constructor(props) {
        super(props)
        this.toggleEditTodoListInput = this.toggleEditTodoListInput.bind(this)
        this.renameTodoList = this.renameTodoList.bind(this)
        this.setText = this.setText.bind(this)
        this.toggleEditTodoItemInput = this.toggleEditTodoItemInput.bind(this)
        this.toggleAddTodoListInput = this.toggleAddTodoListInput.bind(this)
        this.addTodoList = this.addTodoList.bind(this)
        this.state = {
            editTodoListInput: false,
            editTodoItemInput: false,
            editInputId: null,
            editItemListId: null,
            text: '',
            addTodoList: false,
        }
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
        return () => this.setState({editTodoItemInput: !this.state.editTodoItemInput, editInputId: id, editItemListId: todoListId})
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
            this.toggleAddTodoListInput()
        }
    }

    renderNameInput(id, todoListId) {
        const { addTodoList } = this.state
        return (
            <div>
                <input type="text" placeholder="Enter new name" onChange={(e) => this.setText(e)} />
                <button onClick={todoListId ? this.renameTodoItem(id) : (addTodoList ? this.addTodoList() : this.renameTodoList(id))}>save</button>
            </div>
        )
    }

    renderTodoItems(todos) {
        const { editTodoItemInput, editInputId, editItemListId } = this.state
        return (
            todos.map((todo, i) => <li key={i}>
                <div>
                    {todo.node.name}
                    {editTodoItemInput && editInputId === i && editItemListId === todo.node.todoListId ? this.renderNameInput(parseInt(atob(todo.node.id).split(':')[1], 10), todo.node.todoListId) : <button onClick={this.toggleEditTodoItemInput(i, todo.node.todoListId)}>edit</button>}
                </div>
            </li>)
        )
    }

    renderTodoList(todoList, i) {
        const { editTodoListInput, editInputId } = this.state
        const todoListId = parseInt(atob(todoList.node.id).split(':')[1], 10)
        return (
             <li key={i}>
                <div>
                    {todoList.node.name}
                    {editTodoListInput && editInputId === i ? this.renderNameInput(todoListId) : <button onClick={this.toggleEditTodoListInput(i)}>edit</button>}
                    <div>
                        <ul>
                            {this.renderTodoItems(todoList.node.todos.edges)}
                        </ul>
                    </div>
                </div>
            </li>
        )
    }

    render() {
        const { addTodoList } = this.state
        const allTodoLists = this.props.data.allTodoLists ? this.props.data.allTodoLists.edges : []
        const todoListsLoaded = allTodoLists.length > 0
        return (
            <div>
                {addTodoList ? this.renderNameInput() : <button onClick={this.toggleAddTodoListInput()}>add todo list</button>}
                <ul>
                    {todoListsLoaded && allTodoLists.map((todoList, i) => this.renderTodoList(todoList, i))}
                </ul>
            </div>
        )
    }
}

// Initialize GraphQL queries or mutations with the `gql` tag
const allTodoLists = gql`query {
   allTodoLists {
        edges {
            node {
                id
                name
                todos {
                    edges {
                        node {
                            id
                            name
                            todoListId
                        }
                    }
                }
            }
        }
    }
}`

const renameTodoListMutation = gql`
    mutation updateTodoList($id: Int, $name: String!) {
        updateTodoList(id: $id, name: $name) { todoList { name } }
    }
`

const renameTodoItemMutation = gql`
    mutation updateTodoItem($id: Int, $name: String!) {
        updateTodoItem(id: $id, name: $name) { todoItem { name } }
    }
`

const addTodoListMutation = gql`
  mutation addTodoList($name: String!) {
    createTodoList(name: $name) { todoList { id } }
  }
`

// We then can use `graphql` to pass the query results returned by MyQuery
// to MyComponent as a prop (and update them as the results change)
// export const MyComponentWithQuery = graphql(allEmployees)(MyComponent)

const withQueryAndMutations = graphql(renameTodoListMutation, {name: 'renameTodoList'})(
    graphql(renameTodoItemMutation, {name: 'renameTodoItem'})(
        graphql(addTodoListMutation, {name: 'addTodoList'})(
            graphql(allTodoLists)(MyComponent)
        )
    )
)



// const MyComponentLinked = connect(
//   state => state.toJSON(),
// )(MyComponentWithQuery)

const MyComponentLinked = connect(
  state => state.toJSON(),
)(withQueryAndMutations)

export default MyComponentLinked