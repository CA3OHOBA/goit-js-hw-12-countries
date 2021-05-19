import countryTemplate from '../templates/countryTemplate.hbs';
import countriesListTemplate from '../templates/countriesList.hbs';
import api from './fetchCountries';
import { alert, error } from '@pnotify/core';
import debounce from 'lodash.debounce';

const refs = {
  input: document.querySelector('input'),
  countriesList: document.querySelector('.countries'),
  countryMarkup: document.querySelector('.countries'),
};

refs.input.addEventListener('input', debounce(inputHandler), 500);

function inputHandler(e) {
  const inputValue = e.target.value;
  if (!inputValue) return;
  api
    .fetchCountries(inputValue)
    .then(checkData)
    .catch(err =>
      error({
        text: 'error',
        delay: 500,
      }),
    );
  refs.countryMarkup.innerHTML = '';
}

function checkData(data) {
  if (data.length === 1) makeCountryMarkup(data);
  else if (data.length >= 2 && data.length <= 10) makeCountriesListMarkup(data);
  else if (data.length > 10)
    alert({
      text: 'Make your request more specific!',
      delay: 300,
    });
}

function makeCountryMarkup(country) {
  refs.countryMarkup.innerHTML = countryTemplate(country);
}

function makeCountriesListMarkup(countries) {
  refs.countriesList.innerHTML = countriesListTemplate(countries);
}
