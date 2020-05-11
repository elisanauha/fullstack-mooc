import React from 'react';
import Person from './Person'

const Persons = ({ persons }) => {
    return (
        <div>
            {persons.map((person) => <Person person={person} key={person.name}></Person>)}
        </div>
    );
};

export default Persons;