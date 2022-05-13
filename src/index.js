import './css/styles.css';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
function onSearch() {
  const searchingCountry = inputEl.value;
  const url = `https://restcountries.com/v3.1/name/${searchingCountry}?fields=name,capital,population,flags,languages`;

  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(countries => {
      console.log(countries);
      if (searchingCountry === '') {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
      } else if (countries.length === 1) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = countryInfoRender(countries);
      } else {
        countryInfo.innerHTML = '';
        countryList.innerHTML = countryListRender(countries);
      }
    });
}

function countryListRender(arg) {
  return arg
    .map(
      item => `<li class="country-list__item">
        <img class="country-list__svg" src="${item.flags.svg}" alt="" width="20" height="20">
        <p class="country-list__name">${item.name.common}</p>
      </li>`,
    )
    .join('');
}
function countryInfoRender(arg) {
  return arg
    .map(
      item => `<div class="country-info__wrap">
        <img class="country-info__svg" src="${item.flags.svg}" alt="" width="30" height="30" />
        <h2 class="country-info__name">${item.name.common}</h2>
      </div>
      <ul class="country-info__list">
        <li class="country-info__item">Capital:<span class="country-info__text-wrap">${
          item.capital
        }</span></li>
        <li class="country-info__item">Population:<span class="country-info__text-wrap">${
          item.population
        }</span></li>
        <li class="country-info__item">Languages:<span class="country-info__text-wrap">${Object.values(
          item.languages,
        )}</span></li>
      </ul>`,
    )
    .join('');
}
