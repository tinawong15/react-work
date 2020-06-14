import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Weather from './components/Weather'
const App = () => {
    const [showAll, setShowAll] = useState('')
    const [result, setResult] = useState([])
    const [preview, setPreview] = useState(false)

    const handleFilterChange = (event) => {
        setShowAll(event.target.value)
        setPreview(false)
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

    const displayLanguages = (country) => {
        const display = country.languages.map(language =>
            <li key={language.name}>{language.name}</li>)
        return display
    }
    const handleClick = (country) => {
        setPreview(country)
    }

    const showPreview = () => {
        if(preview !== false) {
            return (<div>
                    <h1>{preview.name}</h1>
                    <p>capital: {preview.capital}</p>
                    <p>population: {preview.population}</p>
                    <h3>languages</h3>
                    <ul>{displayLanguages(preview)}</ul>
                    <img src={preview.flag} width="100px" alt=""/>
                </div>)
        }
        else {
            return <div></div>
        }
    }
    const displayCountries = () => {
        if(result.length >= 10) {
            return <div>Too many matches, specify another filter</div>
        }
        else if(result.length > 1) {
            const display = result.map(country =>
                <div key={country.numericCode}>{country.name}<button onClick={()=>handleClick(country)}>show</button></div>)
            return display
        }
        else if(result.length === 1) {
            console.log(result)
            return <div>
                <h1>{result[0].name}</h1>
                <p>capital: {result[0].capital}</p>
                <p>population: {result[0].population}</p>
                <h3>languages</h3>
                <ul>{displayLanguages(result[0])}</ul>
                <img src={result[0].flag} width="100px" alt=""/>
                <Weather country={result[0]}/>
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
            {showPreview()}
        </div>
    )
}

export default App