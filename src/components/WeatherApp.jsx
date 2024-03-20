import React, { useState } from 'react';

const WeatherApp = () => {
    // Initializing, Destructuring and Updating the States
    const [currentInputValue, setCurrentInputValue] = useState("");
    // console.log(currentInputValue);

    const [searchedLocationInfo, setSearchedLocationInfo] = useState(null);


    // Defining the Methods
    const getCurrentDate = () => {
        const currentDate = new Date();

        const monthText = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const getMonth = currentDate.getMonth();
        const setMonth = monthText[getMonth];
        // console.log(setMonth);

        const setDays = currentDate.getDate();
        // console.log(setDays);

        const setYear = currentDate.getFullYear();
        return `${setMonth} ${setDays} ${setYear}`
    };

    const fetchData = async () => {
        try {
            const apiKey = "349a149be3fee96f836a06f236f05860";
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${currentInputValue}&APPID=${apiKey}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Failed to fetch weather data', response.status);
            }

            const data = await response.json();

            const weatherObj = {
                location: `${data.name}`,
                temperatur: `${Math.round(data.main.temp)}`,
                low_temperatur: `${Math.round(data.main.temp_min)}`,
                high_temperatur: `${Math.round(data.main.temp_max)}`,
                condition: `${data.weather[0].description}`
            };
            setSearchedLocationInfo(weatherObj);

        } catch (err) {
            console.error("Error fetching data: ", err);
        }
    };

    const handleCurrentSearchChange = (e) => {
        const inputValue = e.target.value;
        setCurrentInputValue(inputValue);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        fetchData();
        setCurrentInputValue("");
    };

    // Re-rendering  in UI
    return (
        <>
            <div className="app-container">
                <div className="app-inner-container">

                    <div className="app-header-container">
                        <h1>Weather App - React</h1>
                    </div>

                    <div className="app-date-container">
                        <h3>{getCurrentDate()}</h3>
                    </div>

                    <div className="search-location-container">
                        <form onSubmit={handleSearchSubmit}>
                            <input
                                type="text"
                                name="searchName"
                                placeholder="Search a Location..."
                                value={currentInputValue}
                                onChange={handleCurrentSearchChange}
                            />

                            <button>Search</button>
                        </form>
                    </div>

                    <div className="display-weather-condition">
                        {
                            searchedLocationInfo && (
                                <div className="items">
                                    <h1>{searchedLocationInfo.location}</h1>
                                    <h3>{searchedLocationInfo.temperatur} &deg;C</h3>
                                    <h3>{searchedLocationInfo.low_temperatur} &deg;C</h3>
                                    <h3>{searchedLocationInfo.high_temperatur} &deg;C</h3>
                                    <p>{searchedLocationInfo.condition}</p>
                                </div>
                            )
                        }
                    </div>

                    <img src="/cute-cloud.png" alt="Cloud Image" />
                </div>
            </div >

        </>
    );
}

export default WeatherApp;
