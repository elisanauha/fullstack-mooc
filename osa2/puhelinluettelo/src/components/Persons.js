import React from 'react';
import Person from './Person'

const Persons = ({ persons, handleDeleteOf }) => {
    return (
        <div>
            {persons.map((person) => <Person person={person} key={person.name}
                handleDelete={() => { handleDeleteOf(person.id) }}>
            </Person>)}
        </div>
    );
};

export default Persons;