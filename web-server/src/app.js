const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs'); // using handlebars .hbs template for dynamic content
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Ari Alghifari'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Ari Alghifari'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		helpText: 'Example help text',
		name: 'Ari Alghifari'
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: 'Error 404',
		name: 'Ari Alghifari',
		errorMessage: 'Help article not found.'
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must enter the location.'
		});
	}

	geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
		if (error) {
			return res.send({ error });
		}

		forecast(latitude, longitude, (error, forecastData) => {
			forecastData = forecastData.split('+'); //forecastData[0] = data, forecastData[1] = weather icon

			if (error) {
				return res.send({ error });
			}

			res.send({
				forecast: forecastData[0],
				location: location,
				adress: req.query.address,
				icon: forecastData[1]
			});
		});
	});
	
});

app.get('*', (req, res) => { // wildcards handlers e.g. 404 page
	res.render('404', {
		title: 'Error 404',
		name: 'Ari Alghifari',
		errorMessage: 'Page not found.'
	});
});

app.listen(port, () => {
	console.log('Running on port ' + port);
});