import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Weather = () => {
    const [ information, setInformation ] = useState({});

    const [ isCelcius, setCelcius ] = useState(true);
    const [ isLoading, setIsLoading ] = useState(true)
    console.log(information)
    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);

        function success(pos) {
            const crd = pos.coords;
          
            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=bb497aecf310ce5a711cfdd094002c9b`)
                .then(res => {
                    setInformation(res.data)
                    setIsLoading(false)
                })
          }
    }, [])

    const convertToCelcius = (temperature) => {
        const celcius = temperature -273.15
        const celciusTwoFixed = celcius.toFixed(1)
        return celciusTwoFixed
    }

    return (
        <div className='main-container'>
            {
                isLoading ? (
                    <h2>Cargando...</h2>
                ) : (
                    <>
                        <h1><span>{information.name}</span>, {information.sys?.country}</h1>
                        <div className="description">
                            {information.weather?.[0].description}
                         </div>
                        <div className="weather">
                            <img src={`http://openweathermap.org/img/wn/${information.weather?.[0].icon}.png`} alt="" />
                        </div>

                        <div className="sub-container">
                            <div className="data-container">
                                <p className='temp'><i className="fa-solid fa-temperature-half"></i> {isCelcius ? convertToCelcius(information.main?.temp) : information.main?.temp} {isCelcius ? '°C' : '°K'}</p>
                                <p className='max-temp'><i className="fa-solid fa-temperature-arrow-up"></i> {isCelcius ? convertToCelcius(information.main?.temp_max) : information.main?.temp_max} {isCelcius ? '°C' : '°K'}</p>
                                <p className='min-temp'><i className="fa-solid fa-temperature-arrow-down"></i> {isCelcius ? convertToCelcius(information.main?.temp_min) : information.main?.temp_min} {isCelcius ? '°C' : '°K'}</p>
                            </div>

                            <div className="time">
                                <p className='wind'><i className="fa-solid fa-wind"></i> {information.wind?.speed} km/hr</p>
                                <p className='humidity'><i className="fa-solid fa-droplet"></i> {information.main?.humidity}%</p>
                                <p className='clouds'><i className="fa-solid fa-cloud"></i> {information.clouds?.all}%</p>
                            </div>
                        </div>
                        <button onClick={() => setCelcius(!isCelcius)}>Change to {isCelcius ? 'Kelvin' : 'Celcius'}</button>
                    </>
                    
                )
            }
        </div>
        
    );
};

export default Weather;