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
        this.state = {
            editTodoListInput: false,
            editTodoItemInput: false,
            editInputId: null,
            text: '',
        }
    }

    toggleEditTodoListInput(id) {
        return () => {
            this.setState({editTodoListInput: !this.state.editTodolistInput, editInputId: id})
        }
    }

    toggleEditTodoItemInput(id) {
        return () => this.setState({editTodoItemInput: !this.state.editTodoItemInput, editInputId: id})
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

    renderNameInput(id) {
        return (
            <div>
                <input type="text" placeholder="Enter new name" onChange={(e) => this.setText(e)} />
                <button onClick={this.renameTodoList(id)}>save</button>
            </div>
        )
    }

    renderTodoItems(todos) {
        const { editTodoItemInput, editInputId } = this.state
        return (
            todos.map((todo, i) => <li key={i}>
                <div>
                    {todo.node.name}
                    {editTodoItemInput && editInputId === i ? this.renderNameInput(todo.node.id) : <button onClick={this.toggleEditTodoItemInput(i)}>edit</button>}
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
        const allTodoLists = this.props.data.allTodoLists ? this.props.data.allTodoLists.edges : []
        const todoListsLoaded = allTodoLists.length > 0
        return (
            <div>
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

// We then can use `graphql` to pass the query results returned by MyQuery
// to MyComponent as a prop (and update them as the results change)
// export const MyComponentWithQuery = graphql(allEmployees)(MyComponent)

const withQueryAndMutations = graphql(renameTodoListMutation, {name: 'renameTodoList'})(
    graphql(allTodoLists)(MyComponent)
)


// const MyComponentLinked = connect(
//   state => state.toJSON(),
// )(MyComponentWithQuery)

const MyComponentLinked = connect(
  state => state.toJSON(),
)(withQueryAndMutations)

export default MyComponentLinked