import gql from 'graphql-tag'

// Initialize GraphQL queries or mutations with the `gql` tag

// Mutations describe API calls that make changes to models on the server

export const renameTodoListMutation = gql`
    mutation updateTodoList($id: Int, $name: String!) {
        updateTodoList(id: $id, name: $name) { todoList { name } }
    }
`

export const renameTodoItemMutation = gql`
    mutation updateTodoItem($id: Int, $name: String!) {
        updateTodoItem(id: $id, name: $name) { todoItem { name } }
    }
`

export const addTodoListMutation = gql`
  mutation addTodoList($name: String!) {
    createTodoList(name: $name) { todoList { id } }
  }
`

export const addTodoItemMutation = gql`
   mutation addTodoItem($todoListId: Int!, $name: String!) {
       createTodoItem(todoListId: $todoListId, name: $name) { todoItem {id } }
   }
`

export const deleteTodoListMutation = gql`
    mutation deleteTodoList($id: Int!) {
        deleteTodoList(id: $id) { todoList { id } }
    }
`

export const deleteTodoItemMutation = gql`
    mutation deleteTodoItem($id: Int!) {
        deleteTodoItem(id: $id) { todoItem { id } }
    }
`