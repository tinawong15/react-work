import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'

const App = () => {
    const [showAll, setShowAll] = useState('')
    const [result, setResult] = useState([])

    const handleFilterChange = (event) => {
        setShowAll(event.target.value)
    }   

    useEffect(() => { 
        console.log('effect')
        if(showAll !== '') {
            const link = 'https://restcountries.eu/rest/v2/name/'+showAll
            axios
            .get(link)
            .then(response => {
                console.log('promise fulfilled')
                setResult(response.data)
            })
        }
        
    }, [showAll])

    const displayLanguages = () => {
        const display = result[0].languages.map(language =>
            <li key={language.name}>{language.name}</li>)
        return display
    }
    const displayCountries = () => {
        if(result.length >= 10) {
            return <div>Too many matches, specify another filter</div>
        }
        else if(result.length > 1) {
            const display = result.map(country =>
                <div key={country.numericCode}>{country.name}</div>)
            return display
        }
        else if(result.length === 1) {
            console.log(result)
            return <div>
                <h1>{result[0].name}</h1>
                <p>capital: {result[0].capital}</p>
                <p>population: {result[0].population}</p>
                <h3>languages</h3>
                <ul>{displayLanguages()}</ul>
                <img src={result[0].flag} width="100px" alt=""/>
            </div>
        }
        else {
            return <div></div>
        }
    }

    return (
        <div>
            find countries <input value={showAll} onChange={handleFilterChange}/><br></br>
            {displayCountries()}
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
  )