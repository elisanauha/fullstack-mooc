import React from 'react';

const CountryList = ({ countries, handleShow }) => {
    return (
        <div>
            {countries.map(country => <p key={country.alpha3Code}>
                {country.name}{" "}
                <button value={country.name} onClick={handleShow}>show</button>
            </p>)}
        </div>
    );
};

export default CountryList;