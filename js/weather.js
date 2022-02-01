const APIKey = 'UV0YJZAUM9Q9gi9rj8a89G8yrZJU1zjB';
const baseUrl = 'http://dataservice.accuweather.com/';

const getCityUrl = cityName =>
    `${baseUrl}locations/v1/cities/search?apikey=${APIKey}&q=${cityName}`;

const getWeatherUrl = cityKey =>
    `${baseUrl}currentconditions/v1/${cityKey}?apikey=${APIKey}&language=pt-br`;

const fetchData = async url => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Não foi possível obter os dados');
        }
        
        const data = await response.json();

        if (!data.length) {
            throw new Error('Esta cidade não existe');
        }

        return data
    } catch ({ name, message }) {
        alert(`${name}: ${message}`)
    }
}

const getCityData = cityName => fetchData(getCityUrl(cityName));
const getCityWeather = cityKey => fetchData(getWeatherUrl(cityKey));
