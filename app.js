const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const location = process.argv[2]; // get data from cli e.g. 'node app bali'

if (location) {
	geocode(location, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return console.log(error);
		}
	
		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return console.log(error);
			}
	
			console.log(location);
			console.log(forecastData);
		});
	});
} else {
	console.log('Please insert location e.g. "node app bali"');
}
