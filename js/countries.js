window.addEventListener('load', start)

// Application State

let tabCountries = null;
let tabFavorites = null;

let allCountries = [];
let favoriteCountries = [];

let countCountries = 0;
let countFavorites = 0;

let totalPopulationList = 0;
let totalPolulationFavorites = 0;

let numberFormat = null;

function start() {
  tabCountries = document.querySelector('.standard-countries .countries');
  tabFavorites = document.querySelector('.selected-countries .countries');

  countCountries = document.querySelector('#countCountries');
  countFavorites = document.querySelector('#countFavorites');

  totalPopulationList = document.querySelector('#totalPopulationList');
  totalPolulationFavorites = document.querySelector('#totalPopulationFavorites');

  numberFormat = Intl.NumberFormat('pt-BR');

  fetchCountries(); 
}

async function fetchCountries() {
  const res = await window.fetch('https://restcountries.eu/rest/v2/all');
  const json = await res.json();
  allCountries = json.map( country => {

    const { numericCode, name, population, flag } = country;

    return {
      id: numericCode,
      name,
      population,
      flag
    }
  });

  render();
}

function render() {
  renderCountryList();
  renderFavorites();
  renderSummary();

  handleCountryButtons();
}

function renderCountryList() {
  let countriesHTML = '<div class="countries">';

  allCountries.forEach( country => {
    const { name, flag, id, population } = country;
    
    const countryHTML = `
      <div class='country-single'>

        <button id="${id}" class="success">+</button>
        <div style="background: url(${flag});
        background-size: cover; 
        background-position: center;
        background-repeat: no-repeat" class="country-image"></div>

        <div>
          <p>${name}</p>
          <small>${population}</small>
        </div>

      </div>
    `;

    countriesHTML += countryHTML;
  })

  countriesHTML += '</div>';

  tabCountries.innerHTML = countriesHTML;
}

function renderFavorites() {
  let favoritesHTML = '<div class="countries">';

  favoriteCountries.forEach( country => {
    const { name, flag, id, population } = country;

    const favoriteCountryHTML = `
      <div class='country-single'>

        <button id="${id}" class="danger">-</button>
        <div style="background: url(${flag});
        background-size: cover; 
        background-position: center;
        background-repeat: no-repeat" class="country-image"></div>

        <div>
          <p>${name}</p>
          <small>${population}</small>
        </div>

      </div>
    `;

    favoritesHTML += favoriteCountryHTML;
  })

  favoritesHTML += '</div>';

  tabFavorites.innerHTML = favoritesHTML;
}

function renderSummary() {
  countCountries.textContent = allCountries.length;
  countFavorites.textContent = favoriteCountries.length;

  const totalPopulation = allCountries.reduce( (acc, curr) => {
    return acc + curr.population;
  }, 0)

  totalPopulationList.textContent = totalPopulation;

  const totalFavorites = favoriteCountries.reduce( (acc, curr) => {
    return acc + curr.population;
  }, 0)

  totalPopulationFavorites.textContent = totalFavorites;
}

function handleCountryButtons() {

}