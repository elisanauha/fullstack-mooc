import React from 'react';
import Country from './Country'
import CountryList from './CountryList'

const Countries = ({ countries, handleShow }) => {
    return (
        <div>
            {countries.length > 10 && <p>Too many matches, specify another filter</p>}
            {(countries.length > 1 && countries.length <= 10) && <CountryList countries={countries} handleShow={handleShow}></CountryList>}
            {countries.length === 1 && <Country country={countries[0]}></Country>}
        </div>
    );
};

export default Countries;