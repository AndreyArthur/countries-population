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
  totalPolulationFavorites = document.
    querySelector('#totalPopulationFavorites');

  numberFormat = Intl.NumberFormat('en-US');

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
      formattedPopulation: formatNumber(population),
      flag
    }
  });

  favoritesCountries = allCountries;
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
    const { name, flag, id, population, formattedPopulation } = country;
    
    const countryHTML = `
      <div class='country-single'>

        <button id="${id}" class="success btn">+</button>
        <div style="background: url(${flag});
        background-size: cover; 
        background-position: center;
        background-repeat: no-repeat" class="country-image"></div>

        <div>
          <p>${name}</p>
          <small>${formattedPopulation}</small>
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
    const { name, flag, id, population, formattedPopulation } = country;

    const favoriteCountryHTML = `
      <div class='country-single'>

        <button id="${id}" class="danger btn">-</button>
        <div style="background: url(${flag});
        background-size: cover; 
        background-position: center;
        background-repeat: no-repeat" class="country-image"></div>

        <div>
          <p>${name}</p>
          <small>${formattedPopulation}</small>
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

  totalPopulationList.textContent = formatNumber(totalPopulation);

  const totalFavorites = favoriteCountries.reduce( (acc, curr) => {
    return acc + curr.population;
  }, 0)

  totalPopulationFavorites.textContent = formatNumber(totalFavorites);
}

function handleCountryButtons() {
  const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'));
  const favoriteButtons = Array.from(tabFavorites.querySelectorAll('.btn'));

  countryButtons.forEach( button => {
    button.addEventListener('click', () => addToFavorites(button.id));
  })

  favoriteButtons.forEach( button => {
    button.addEventListener('click', () => removeFromFavorites(button.id));
  })
}

function addToFavorites(id) {
  const countryToAdd = allCountries.find( country => country.id === id);

  favoriteCountries = [...favoriteCountries, countryToAdd];

  favoriteCountries.sort( (a, b) => {
    return a.name.localeCompare(b.name);
  });

  allCountries = allCountries.filter( country => country.id !== id);

  render();
}

function removeFromFavorites(id) {
  const countryToRemove = favoriteCountries.find( country => country.id === id);

  allCountries = [...allCountries, countryToRemove];

  allCountries.sort( (a, b) => {
    return a.name.localeCompare(b.name);
  });

  favoriteCountries = favoriteCountries.filter( country => country.id !== id);

  render();
}

function formatNumber(number) {
  return numberFormat.format(number);
}