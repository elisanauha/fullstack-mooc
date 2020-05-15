import React from 'react';

const Filter = ({ handleChange, filter }) => {
    return (
        <div>
            Find countries <input value={filter} onChange={handleChange}></input>
        </div>
    );
};

export default Filter;