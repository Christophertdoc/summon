import React from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import { withApollo } from "@apollo/react-hoc"
import { Mutation } from "react-apollo"

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

// const ADD_NOTE = gql`
//   mutation {
//     addNote(
//         objects: [
//             {
//               id: "adf",
//               name: "ansdkfkaf",
//               content: "ueuiruiruei"
//             }
//         ]
//     ){
//       affected_rows
//     }
//   }
// `

const Notes = () => {

  let input

  const { loading, error, data } = useQuery(NOTES)
  const [deleteNote, { loading: deleting, error: deleteError }] = useMutation(REMOVE_NOTE)
  // const [addNote, { noteData }] = useMutation(ADD_NOTE)

  const remove = (id) => {
    console.log('delete')
    deleteNote({
      variables: { id: id }
    });
  }

  if (loading) return "Loading..."
  if (error) return `Error! ${error.message}`

  return (
    <div>
      {data.notes.map(note => (
        <div key={note.id}>
          <h2>{note.name}</h2>
          <p>{note.content}</p>
          <button onClick={ () => remove(note.id) }>
            DELETE
          </button>
        </div>
      ))}
      <Mutation mutation={ADD_NOTE}>

        {/* <form
          onSubmit={e => {
            e.preventDefault();
            addNote({ variables: { id: input.value, name: input.value, content: input.value } });
            input.value = '';
          }}
        >
          <input
            ref={node => {
              input = node;
            }}
          />
          <button type="submit">Add Note</button>
        </form> */}

        {/* <button onClick={ () => {
            addNote()  
          }}>
              Add note
          </button> */}

          {(addNote, {loading, data}) => {
            return (
              <form onSubmit={(e) => {
                e.preventDefault()
                console.log('submit')
                addNote({ variables: {id: '5', name: 'hotel', content: 'Then will sun'} })
              }}>
                <button type="submit">submit</button>
              </form>
            )
          }}

      </Mutation>
    </div>
  )
}

export default withApollo(Notes)