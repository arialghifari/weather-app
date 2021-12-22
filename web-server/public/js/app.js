const weatherForm = document.querySelector('form');
const searchLocation = document.querySelector('input');
const message = document.querySelector('.message');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const icon = document.querySelector('.icon');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();

	message.style.display = "flex";
	messageOne.textContent = 'Loading...';
	messageTwo.textContent = '';
	icon.style.display = "none";

	fetch('/weather?address=' + searchLocation.value).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				messageOne.textContent = data.error;
			} else {
				messageOne.textContent = data.forecast;
				messageTwo.textContent = data.location;
				icon.style.display = "initial";
				icon.src = data.icon;
			}
		});
	});
});