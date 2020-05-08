import React from 'react';

const Total = (props) => {
    const reducer = (accumulator, part) => accumulator + part.exercises
    const total = props.parts.reduce((accumulator, part) => accumulator + part.exercises, 0)
    return (
        <p><strong>Total of {total} exercises</strong></p>
    )
}

export default Total;