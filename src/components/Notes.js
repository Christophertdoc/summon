import React from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import { withApollo } from "@apollo/react-hoc"

export const NOTES = gql`
  {  
    notes {
      id 
      name
      content
    }
  }  
`
const REMOVE_NOTE = gql`
  mutation ($id: String) {
    delete_notes (
      where: {
        id: {
          _eq: $id
        }
      }
    ) {
      affected_rows
    }
  }
`

const ADD_NOTE = gql`
  mutation AddNote($id: String!, $name: String!, $content: String!) {
    insert_notes(objects: [{id: $id, name: $name, content: $content}]) {
      affected_rows
      returning {
        id
        name
        content
      }
    }
  }
`

const Notes = () => {

  let input

  const { loading, error, data } = useQuery(NOTES)
  const [deleteNote, { loading: deleting, error: deleteError }] = useMutation(REMOVE_NOTE)
  const [addNote, { noteData }] = useMutation(ADD_NOTE)

  const remove = (id) => {
    console.log('delete')
    deleteNote({
      variables: { id: id }
    })
  }

  if (loading) return "Loading..."
  if (error) return `Error! ${error.message}`

  return (
    <div>
      {data.notes.map(note => (
        <div key={note.id}>
          <h2>{note.name}</h2>
          <p>{note.content}</p>
          <button onClick={ () => remove(note.id) }>DELETE</button>
        </div>
      ))}
      <form
        onSubmit={e => {
          e.preventDefault()
          addNote({ variables: { id: input.value, name: input.value, content: input.value } })
          input.value = ''
        }}
      >
        <input ref={node => { input = node }} />
        <button type="submit">ADD NOTE</button>
      </form>
    </div>
  )
}

export default withApollo(Notes)