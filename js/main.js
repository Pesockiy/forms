let inputs = document.querySelectorAll('input'),
	formLogin = document.querySelector('#form__login'),
	formRegister = document.querySelector('#form__register');


addEventListnersToInputs(inputs);

function onKeyUp(e) {
	let validateParams = null;
	elem = e.target;
	switch (elem.name) {
		case 'password': {
			validateParams = {
				RegExpString: "^[a-zA-Z0-9-_\.]{4,8}$"
			}
			break;
		}

		case 'name': {
			validateParams = {
				RegExpString: "^[a-zA-Z][a-zA-Z0-9-_\.]{3,20}$"
			}
			break;
		}

		case 'email': {
			validateParams = {
				RegExpString: "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
			}
			break;
		}

	}

	elem.value = validateParams ? inputValidate(elem.value, validateParams, elem) : elem.value;
}

function inputValidate(value, validateParams, item) {
	let regexp = new RegExp([validateParams.RegExpString], 'g')
	let validCharsArray = value.match(regexp);


	if (validCharsArray) {
		item.parentNode.classList.remove('form__control-warning');
		item.parentNode.classList.add('form__control-success')
	} else if (item.value.length < 1) {
		item.parentNode.className = 'form__control-wrap';
	} else {
		item.parentNode.classList.add('form__control-warning');
		item.parentNode.classList.remove('form__control-success');
	}

	return value;
}

function addEventListnersToInputs(inputs) {
	let inputsArray = Array.from(inputs);
	inputsArray.forEach(function (input) {
		input.addEventListener('keyup', {
			handleEvent: onKeyUp
		})
	});
}


formLogin.addEventListener('submit', {
	handleEvent: formationRequest
});
formRegister.addEventListener('submit', {
	handleEvent: formationRequest
});


//serialization
function getQueryString(formData) {
	let pairs = [];
	for (let [key, value] of formData.entries()) {
		pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
	}
	return '?' + pairs.join('&');
}


//checking all fields are valid
function validate(form) {
	let fields = Array.from(form.querySelectorAll('.form__control'));
	return fields.every(function (elem) {
		return elem.closest('.form__control-success');
	});
}



function formationRequest(evt) {
	evt.preventDefault();
	let data = new FormData(evt.target);

	if(!validate(evt.target)) return;
	console.log(getQueryString(data));

	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'handler.php');
	xhr.send(data);

}



