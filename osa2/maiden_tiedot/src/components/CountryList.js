import React from 'react';

const CountryList = ({ countries }) => {
    return (
        <div>
            {countries.map(country => <p key={country.alpha3Code}>{country.name}</p>)}
        </div>
    );
};

export default CountryList;