const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

geocode('Bali', (error, data) => {
	console.log('Error', error);
	console.log('Data', data);
});

forecast(-8.607160014855987, 115.15682616804375, (error, data) => {
	console.log('Error', error);
	console.log('Data', data);
});