const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
	const url = 'http://api.weatherstack.com/current?access_key=09c6ec214c42983b6725984c50e444bf&query='+ encodeURIComponent(latitude) + ',' +  encodeURIComponent(longitude);

	request({ url: url, json: true}, (error, response) => {
		if (error) {
			callback('Unable to connect to forecast service.', undefined);
		} else if (response.body.error) {
			callback('Unable to find location. Try another search.', undefined);
		} else {
			const current = response.body.current;
			callback(undefined, current.weather_descriptions + '. It is currently ' + current.temperature + '°C out and it feels like ' + current.feelslike + '°C out. There is ' + current.precip + '% chance of raining.');
		}
	});
}

module.exports = forecast;