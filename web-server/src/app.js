const express = require('express');
const path = require('path');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public/');

app.use(express.static(publicDirectoryPath));

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