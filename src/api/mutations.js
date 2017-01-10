import gql from 'graphql-tag'

// Initialize GraphQL queries or mutations with the `gql` tag

// Mutations describe API calls that make changes to models on the server

// NOTE: We always return the `id` of the object. This allows Apollo to
// keep our local cash up to date with the server. What key Apollo uses
// uniquely identify records is defined by `dataIdFromObject` in `apollo_client`


export const renameTodoListMutation = gql`
    mutation updateTodoList($id: Int, $name: String!) {
        updateTodoList(id: $id, name: $name) { todoList { id, name } }
    }
`

export const renameTodoItemMutation = gql`
    mutation updateTodoItem($id: Int, $name: String!) {
        updateTodoItem(id: $id, name: $name) { todoItem { id, name } }
    }
`

export const addTodoListMutation = gql`
  mutation addTodoList($name: String!) {
    createTodoList(name: $name) { todoList { id, name } }
  }
`

export const addTodoItemMutation = gql`
   mutation addTodoItem($todoListId: Int!, $name: String!) {
       createTodoItem(todoListId: $todoListId, name: $name) { todoItem { id, name } }
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