import React, { useState } from 'react'
import service from '../service'

const Persons = (props) => {
    const [error, setError] = useState(null)

    const persons = props.persons
    const newSearch = props.newSearch
    const search = () => {
        return (
            persons.filter(person =>  
                (person.name).toLowerCase().indexOf(newSearch.toLowerCase()) > -1
            )
        )
    }

    const handleDelete = (person) => {
        if(window.confirm(`Delete ${person.name}?`))
            service.deleteEntry(person.id)
                .then(response => {
                    //creates copy of array before and after element
                    props.setPersons(
                        ...persons.slice(0, person.id)
                        .concat(...persons.slice(person.id + 1)
                        )
                    )
                })
                .catch(err => {
                    setError(`${person.name} was already removed`)
                    console.log('Failed to delete entry', err)
                    setTimeout(() => { 
                        setError(null)
                    }, 5000)
                }
                )
    }

    return (
        <>
        <Notification message={error} />
        {search().map(person => 
            <>
            <Numbers key={person.number} name={person.name} number={person.number} />
            <button key={person.id} onClick={() => handleDelete(person)} >delete</button>
            </>
            )}
        </>
    )
}

const Notification = ({ message }) => {
    if (message === null) 
        return null

    return (
        <div className="error" >
            {message}
        </div>
    )
}


const Numbers = (props) => {
    
    return (
    <p>
        <b>{props.name}</b>: {props.number}
    </p>
    )
}

export default Persons