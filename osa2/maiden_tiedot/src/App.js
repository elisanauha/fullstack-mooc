import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])
  const filteredCountries = countries.filter((country) => {
    return country.name.toLowerCase().includes(filter.toLowerCase())
  })


  return (
    <div>
      <Filter filter={filter} handleChange={(event) => setFilter(event.target.value)}></Filter>
      <Countries countries={filteredCountries} handleShow={(event) => setFilter(event.target.value)}></Countries>
    </div>
  );
}

export default App;
