import React from "react"
import { useQuery } from "@apollo/react-hooks"
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

function Notes() {

    const { loading, error, data } = useQuery(NOTES)

    if (loading) return "Loading..."
    if (error) return `Error! ${error.message}`

    return (
        <div>
            {data.notes.map(note => (
                <div key={note.id}>
                    <h2>{note.name}</h2>
                    <p>{note.content}</p>
                </div>
            ))}
        </div>
    )
}

export default withApollo(Notes)