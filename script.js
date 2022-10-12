const API_KEY = 'api_key=04fdc14d656df962ef632f91783cb123';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL);

function getMovies(url) {
    fetch(url)
    .then(response => response.json())
    .then((result) => {
        console.log(result.results);
        showMovies(result.results);
    })
}

function showMovies(result) {
    main.innerHTML = '';

    result.forEach(movie => {
        const {title, poster_path, vote_average, release_date} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = 
        `<img src="${IMG_URL+poster_path}" alt="${title}">

        <div class="movie-info">
          <h3>${title}</h3>
          <span>${vote_average}</span>
        </div>

        <div class="tgl-rilis">
          ${release_date}
        </div>`

        main.appendChild(movieEl);
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    if(searchTerm) {
        getMovies(searchURL+'&query='+searchTerm);
    } else {
        getMovies(API_URL);
    }
})