import React from 'react';

const Filter = ({ handleChange, filter }) => {
    return (
        <div>
            filter shown with <input value={filter} onChange={handleChange}></input>
        </div>
    );
};

export default Filter;