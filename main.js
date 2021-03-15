/*
     https://openweathermap.org/
    Required for API Key
*/

const api = {
    // API KEY
    key: "#",
    // API CALL
    base: "http://api.openweathermap.org/data/2.5/"
}

/*
    SET UP AN EVENT LISTENER FOR WHEN USER PRESSES A KEY
    THIS KEY IS 13 WHICH REPRESENTS THE ENTER/RETURN KEY
    RUNNING GET RESULTS FUNCTION
*/
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(event) {
    if (event.keyCode == 13) {
        getResults(searchbox.value);
        // console.log(searchbox.value);
    }
}

/*
    FOLLOWING ON RUNNING A FETCH REQUEST
    FETCHES: "API BASE" + WEATHER + QUERY FROM SEARCHBOX.VALUE + UNITS + APP ID = API.KEY
    RETURNING THE WEATHER AS JSON 
    JSON IS THEN PARSE THROUGH THE RESULTS AS WEATHER
*/
function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);

    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    // TEMPERATURE
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    // WEATHER ELEMENT
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    // HI-LOW
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${weather.main.temp_min}°C / ${weather.main.temp_max}°C`;

}

// DATE BUILDER FUNCTION
function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November", "December"];
    
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}