import React, { useEffect } from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'

const App = () => {
    useEffect(() => {
        console.log('effect')
        axios
        .get('http://localhost:3001/persons')
        .then(response => {
            console.log('promise fulfilled')
            console.log(response.data)
        })
    }, [])
    return (
        <div></div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
  )