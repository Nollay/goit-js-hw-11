import { fetchImages } from '../js/fetchImage';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const input = document.querySelector('.search-form-input');
const btnSearch = document.querySelector('.search-form-button');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
let gallerySimpleLightbox = new SimpleLightbox('.gallery a');

let pageNumber = 1;
let pageNr = 40;

btnSearch.addEventListener('click', event => {
event.preventDefault();
cleanGallery();
let trimmedValue = input.value.trim();
if (trimmedValue !== '') {
    fetchImages(trimmedValue, pageNumber).then(Data => {
    let totalPages = Math.ceil(Data.totalHits / pageNr);
    console.log(totalPages);
    if (Data.hits.length <= 0) {
        btnLoadMore.style.display = 'none';
        Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
        );
    } else {
        renderList(Data.hits);
        Notiflix.Notify.success(
        `Hooray! We found ${Data.totalHits} images.`
        );
        if (Data.totalHits > 40) {
        btnLoadMore.style.display = 'block';
        }
        gallerySimpleLightbox.refresh();
    }
    });
}
});

btnLoadMore.addEventListener('click', () => {
pageNumber += 1;
const trimmedValue = input.value.trim();

fetchImages(trimmedValue, pageNumber).then(Data => {
    let totalPages = Math.ceil(Data.totalHits / pageNr);
    console.log(totalPages);

    if (pageNumber >= totalPages) {
    btnLoadMore.style.display = 'none';
      // console.log('There are no more images');
    Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
    );
    } else {
    renderList(Data.hits);
    btnLoadMore.style.display = 'block';
    }
});
});

function renderList(images) {
console.log(images, 'images');
const markup = images
    .map(image => {
    console.log('img', image);
    return `<div class="image-card">
    <a href="${image.largeImageURL}"><img class="image" src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}" loading="lazy"/></a>
        <div class="statistic">
        <p class="statistic-item">
    <b>Likes</b> <span class="statistic-item"> ${image.likes} </span>
</p>
            <p class="statistic-item">
                <b>Views</b> <span class="statistic-item">${image.views}</span>  
            </p>
            <p class="statistic-item">
                <b>Comments</b> <span class="statistic-item">${image.comments}</span>  
            </p>
            <p class="statistic-item">
                <b>Downloads</b> <span class="statistic-item">${image.downloads}</span> 
            </p>
        </div>
    </div>`;
    })
    .join('');
gallery.innerHTML += markup;
}

function cleanGallery() {
gallery.innerHTML = '';
pageNumber = 1;
btnLoadMore.style.display = 'none';
let currentHits = 0;
}