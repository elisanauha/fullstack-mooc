import React from 'react';

const PersonForm = ({ name, number, handleNameChange, handleNumberChange, handlePersonAdd }) => {
    return (
        <form>
            <div>
                name: <input value={name} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={number} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit" onClick={handlePersonAdd}>add</button>
            </div>
        </form>
    );
};

export default PersonForm;