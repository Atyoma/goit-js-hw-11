import './css/styles.css';
import Notiflix from 'notiflix';
import PhotoApiService from './photo-service';

const refs = {
  searchForm: document.querySelector('#search-form'),
  searchQuery: document.querySelector('input[name=searchQuery]'),
  cardContainer: document.querySelector('.gallery'),
  btnSearch: document.querySelector('.search'),
  btnLoadMore: document.querySelector('.load-more'),
};
console.log(refs.searchForm);
console.log(refs.searchQuery);
console.log(refs.cardContainer);
console.log(refs.btnSearch);
console.log(refs.btnLoadMore);

const photoApiService = new PhotoApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  clearCardContainer();
  photoApiService.value = e.currentTarget.elements.searchQuery.value;
  photoApiService.resetPage();
  // const BASE_URL = 'https://pixabay.com/api/';
  // const keyAPI = 'key=25171903-77720667295a00af61497589c';
  // return fetch(
  //   `${BASE_URL}?${keyAPI}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`,
  // )
  //   .then(response => response.json())
  //   .then(console.log);

  photoApiService.fetchArticles().then(appendHitsMarkup);
}

function onLoadMore() {
  photoApiService.fetchArticles().then(appendHitsMarkup);
}

// return countrys
//       .map(({ name, capital, population, flags, languages }) => {
//         return
function appendHitsMarkup(hits) {
  return hits
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return refs.cardContainer.insertAdjacentHTML(
        'beforeend',
        `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes${likes}</b>
    </p>
    <p class="info-item">
      <b>Views${views}</b>
    </p>
    <p class="info-item">
      <b>Comments${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads${downloads}</b>
    </p>
  </div>
</div>`,
      );
    })
    .join('');
}
function clearCardContainer() {
  refs.cardContainer.innerHTML = '';
}
// let maxCountry = 10;
// refs.searchBox.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));

// function onFormInput(e) {
//   console.log(e.target.value);
//   const stringValue = refs.searchBox.value.trim();
//   api(stringValue).then(createCountryCard).catch(onFetchErrror);
// }

// function createCountryCard(countrys) {
//   console.log(countrys.length);
//   if (countrys.length > maxCountry) {
//     Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`);
//     return (refs.countryInfo.innerHTML = '');
//   } else if (countrys.length < 10 && countrys.length !== 1) {
//     refs.countryInfo.innerHTML = '';
//     const markup = countrys
//       .map(
//         country =>
//           `<li><div class="country-title"><img src="${country.flags.svg}" alt="${country.name}" width ="40"><h2 class ="title">${country.name.official}</h2></div></li>`,
//       )
//       .join('');
//     refs.countryList.insertAdjacentHTML('beforeend', markup);
//   } else {
//     refs.countryInfo.innerHTML = '';
//     refs.countryList.innerHTML = '';
//     return countrys
//       .map(({ name, capital, population, flags, languages }) => {
//         return (refs.countryInfo.innerHTML = `<div class="country-title"><img src="${
//           flags.svg
//         }" alt="${name}" width ="80"><h2 class ="title">${
//           name.official
//         }</h2></div><div class="coutry-card"><p class="card-text">Capital: ${capital}</p><p class="card-text">Languages: ${Object.values(
//           languages,
//         )}</p><p class="card-text">Population: ${population}</p></div>`);
//       })
//       .join('');
//   }
// }

// function onFetchErrror(error) {
//   refs.countryList.innerHTML = '';
//   refs.countryInfo.innerHTML = '';
//   Notiflix.Notify.failure(`❌ Oops, there is no country with that name`);
// }
