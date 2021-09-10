const request = require('postman-request');

// Weather temperature
const url = 'http://api.weatherstack.com/current?access_key=09c6ec214c42983b6725984c50e444bf&query=-8.586289651437763,116.08863635574136'; // weather location in kekalik, mataram

request({ url: url, json: true }, (error, response) => {
	if (error) {
		console.log('Unable to connect to weather service');
	} else if (response.body.error) {
		console.log('Unable to find location');
	} else {
		const current = response.body.current;
		const deg = current.temperature + '°C';
		const feelsLikeDeg = current.feelslike + '°C';
		const precipPercentage = current.precip * 100 + '%';
		const weatherDesc = current.weather_descriptions[0];
	
		console.log(weatherDesc + '. It is currently ' + deg + ' out and it feels like ' + feelsLikeDeg + ' out. There is ' + precipPercentage + ' chance of raining.');	
	}
});

// Geocoding
// Address -> Latitude & Longitude
const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/mataram.json?access_token=pk.eyJ1IjoiYXJpYWxnaGlmYXJpMjMiLCJhIjoiY2t0ZDFoMXZmMG9tdDJ1bW9jdDdpeWF6ZiJ9.B-2xOFbuZaUaLm8Rf7Wzww&limit=1';

request({ url: geoUrl, json: true }, (error, response) => {
	if (error) {
		console.log('Unable to connect to weather service');
	} else if (response.body.message || response.body.features.length === 0) {
		console.log('Unable to find the location, try somethi else');
	} else {
		const latitude = response.body.features[0].center[1];
		const longitude = response.body.features[0].center[0];
	
		console.log('latitude: ' + latitude);
		console.log('longitude: ' + longitude);
	}
});
