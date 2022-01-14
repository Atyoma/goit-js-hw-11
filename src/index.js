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

const photoApiService = new PhotoApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  clearCardContainer();
  photoApiService.value = e.currentTarget.elements.searchQuery.value;
  if (photoApiService.value.trim() === '') {
    return Notiflix.Notify.failure('Please, enter something');
  }

  // onShowBtn();
  onHideBtn();
  photoApiService.resetPage();
  photoApiService.fetchHits().then(hits => {
    appendHitsMarkup(hits);
    console.log(hits.length);
    if (hits.length === 0) {
      Notiflix.Notify.failure(
        `"Sorry, there are no images matching your search query. Please try again."`,
      );
      onHideBtn();
    } else if (hits.length < 40) {
      Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
    } else {
      onShowBtn();
    }
  });
}

function onLoadMore() {
  onHideBtn();
  photoApiService.fetchHits().then(hits => {
    appendHitsMarkup(hits);
    console.log(hits);
    if (hits.length < 40) {
      onHideBtn();
      Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
    } else {
      onShowBtn();
    }
  });
}

function appendHitsMarkup(hits) {
  return hits
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return refs.cardContainer.insertAdjacentHTML(
        'beforeend',
        `<li class="item">
          <div class="card">
            <div class="card-thumb">
              <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
            </div>
          <div class="card-content">
    <p class="card-text">
      <b>Likes:</b>
      ${likes}
    </p>
    <p class="card-text">
      <b>Views:</b>
      ${views}
    </p>
    <p class="card-text">
      <b>Comments:</b>
      ${comments}
    </p>
    <p class="card-text">
      <b>Downloads:</b>
      ${downloads}
    </p>
  </div>
          </div>
  </li>`,
      );
    })
    .join('');
}

function clearCardContainer() {
  refs.cardContainer.innerHTML = '';
}

function onShowBtn() {
  refs.btnLoadMore.classList.remove('is-hidden');
}

function onHideBtn() {
  refs.btnLoadMore.classList.add('is-hidden');
}

// function getTotalHitsValue(totalHits) {

// }
// function onBtnDisabled() {
//   refs.btnLoadMore.disabled = true;
//   refs.btnLoadMore.textContent = 'Loading...';
//   refs.btnLoadMore.style.backgroundColor = '#70b9e8';
// }

// function onBtnEnabled() {
//   refs.btnLoadMore.disabled = false;
//   refs.btnLoadMore.textContent = 'Load more';
//   refs.btnLoadMore.style.backgroundColor = '#269ce9';
// }
// ====================html repeta

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
