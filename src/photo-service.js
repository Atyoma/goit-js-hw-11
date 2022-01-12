export default class PhotoApiService {
  constructor() {
    this.value = '';
    this.page = 1;
  }

  fetchArticles() {
    console.log(this);
    const BASE_URL = 'https://pixabay.com/api/';
    const keyAPI = 'key=25171903-77720667295a00af61497589c';

    return fetch(
      `${BASE_URL}?${keyAPI}&q=${this.value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=4&page=${this.page}`,
    )
      .then(response => response.json())
      .then(data => {
        this.page += 1;

        return data.hits;
      });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.value;
  }

  set query(newValue) {
    this.value = newValue;
  }
}
