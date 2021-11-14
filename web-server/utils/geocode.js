const request = require('postman-request');

const geocode = (address, callback) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYXJpYWxnaGlmYXJpMjMiLCJhIjoiY2t0ZDFoMXZmMG9tdDJ1bW9jdDdpeWF6ZiJ9.B-2xOFbuZaUaLm8Rf7Wzww&limit=1';

	request({ url, json: true }, (error, { body } = {}) => {
		if (error) {
			callback('Unable to connect to weather services. Try again.', undefined);
		} else if (body.message || body.features.length === 0) {
			callback('Unable to find location. Try another search.', undefined);
		} else {
			callback(undefined, {
				location: body.features[0].place_name,
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0]
			});
		}
	});
}

module.exports = geocode;