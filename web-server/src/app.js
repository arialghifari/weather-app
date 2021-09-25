const express = require('express');
const path = require('path');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs'); //using handlebars .hbs template for dynamic content
app.set('views', path.join(__dirname, '../views'));
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
		helpText: 'Example help text'
	});
});

app.get('/weather', (req, res) => {
	res.send({
		location: {
			name: 'Mataram'
		},
		forecast: {
			deg: 25,
			wind: 29,
			precip: 0.1
		}
	});
});

app.listen(3000, () => {
	console.log('Running at http://localhost:3000');
});