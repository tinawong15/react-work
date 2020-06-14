import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Weather = (props) => {
    const [temp, setTemp] = useState("")
    const [windspeed, setWindspeed] = useState("")
    const [windDir, setWindDir] = useState('')
    const [icon, setIcon] = useState("")
    console.log(props.country)
    useEffect(() => { 
        // console.log('effect')
            const API_KEY = process.env.REACT_APP_API_KEY
            const link = 'http://api.weatherstack.com/current?access_key='+API_KEY+'&query='+props.country.name
            axios
            .get(link)
            .then(response => {
                // console.log('promise fulfilled')
                console.log(response.data)
                setTemp(response.data.current.temperature)
                setIcon(response.data.current.weather_icons[0])
                setWindspeed(response.data.current.wind_speed)
                setWindDir(response.data.current.wind_dir)
            })
        
    }, [props])
    return (
        <div>
            <h1>Weather in {props.country.name}</h1>
            <p><strong>temperature: </strong>{temp} Celsius</p>
            <img src={icon} width="100px" alt=""/>
            <p><strong>wind: </strong>{windspeed} mph direction {windDir}</p>
        </div>
    )
}
export default Weather