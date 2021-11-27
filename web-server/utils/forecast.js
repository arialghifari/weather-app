const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
	const url = 'http://api.weatherstack.com/current?access_key=09c6ec214c42983b6725984c50e444bf&query='+ encodeURIComponent(latitude) + ',' +  encodeURIComponent(longitude);

	request({ url, json: true}, (error, { body } = {}) => {
		if (error) {
			callback('Unable to connect to forecast service. Try again.', undefined);
		} else if (body.error) {
			callback('Unable to find location. Try another search.', undefined);
		} else {
			const current = body.current;
			callback(undefined, 'The weather is ' + current.weather_descriptions + ' and it is currently ' + current.temperature + '°C out.+' + current.weather_icons);
		}
	});
}

module.exports = forecast;