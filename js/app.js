const cityForm = document.querySelector('[data-js="change-location"]');
const cityCard = document.querySelector('[data-js="city-card"]');
const weatherDetailsContainer = document.querySelectorAll('[data-js="weather-details"] [data-js]');
const timeIconContainer = document.querySelector('[data-js="time-icon"]');
let timeImg = document.querySelector('[data-js= "time"]');

const insertWeatherDetailsInDOM = weatherInfo => {
    weatherDetailsContainer.forEach((tag, index) =>
        tag.textContent = weatherInfo[index]);
}

const showCityCardInDOM = () => {
    const cityCardNotDisplay = cityCard.classList.contains('d-none');

    if (cityCardNotDisplay) {
        cityCard.classList.remove('d-none');
    }
}
const insertImageAndIconInDOM = (IsDayTime, WeatherIcon) => {
    const timeIcon = `<img src= "./src/icons/${WeatherIcon}.svg"/>`;
    timeIconContainer.innerHTML = timeIcon;
    timeImg.src = IsDayTime ? './src/day.jpg' : './src/night.jpg';
}

cityForm.addEventListener('submit', async event => {
    event.preventDefault();

    const searchedCity = event.target.city.value.trim();

    cityForm.reset();

    if (searchedCity.length) {
        const [{ Key, LocalizedName }] = await getCityData(searchedCity);
        const [{ WeatherText, Temperature, IsDayTime, WeatherIcon }] = await getCityWeather(Key);

        const weatherDetails = [
            LocalizedName,
            WeatherText,
            Temperature.Metric.Value
        ];

        showCityCardInDOM();
        insertImageAndIconInDOM(IsDayTime, WeatherIcon);
        insertWeatherDetailsInDOM(weatherDetails);
    }
})
