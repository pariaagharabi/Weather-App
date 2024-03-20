import React, { useState } from 'react';

const WeatherApp = () => {
    // Initializing, Destructuring and Updating the States
    const [currentInputValue, setCurrentInputValue] = useState("");
    console.log(currentInputValue);

    const [searchedLocation, setSearchedLocation] = useState();


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
            const apiKey = "349a149be3fee96f836a06f236f05860"
            const dataURL = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={apiKey}";
            
            const response = await fetch(dataURL);
            if (!response.ok) {
                throw new NetworkError(response.status)
            }

            const data = await response.json();


        } catch (err) {
            console.error("Error fetching data: ", err);
        }
    };
    fetchData();

    const handleCurrentSearchChange = (e) => {
        const inputValue = e.target.value;
        setCurrentInputValue(inputValue);
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
                        <form>
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
                        <h1>City</h1>
                        <h3>Low Degree: &deg;C</h3>
                        <h3>High Degree: &deg;C</h3>
                        <p>Status: Hot</p>
                    </div>

                    <img src="/cute-cloud.png" alt="Cloud Image" />
                </div>
            </div>

        </>
    );
}

export default WeatherApp;
