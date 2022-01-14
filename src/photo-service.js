import Notiflix from 'notiflix';
import axios from 'axios';

export default class PhotoApiService {
  constructor() {
    this.value = '';
    this.page = 1;
    this.totalHits = 0;
    this.perPage = 40;
  }

  fetchHits() {
    axios.defaults.baseURL = 'https://pixabay.com/api/';
    const keyAPI = 'key=25171903-77720667295a00af61497589c';

    return axios(
      `?${keyAPI}&q=${this.value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.perPage}&page=${this.page}`,
    )
      .then(response => response.data)
      .then(data => {
        this.totalHits = data.totalHits;
        this.page += 1;
        if (this.page === 2 && this.totalHits !== 0) {
          Notiflix.Notify.success(`Hooray! We found ${this.totalHits} images.`);
        }

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
