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

btnSearch.addEventListener('click', e => {
  e.preventDefault();
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
        renderImageList(Data.hits);
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
      renderImageList(Data.hits);
      btnLoadMore.style.display = 'block';
    }
  });
});

function renderImageList(images) {
  console.log(images, 'images');
  const markup = images
    .map(image => {
      console.log('img', image);
      return `<div class="photo-card">
       <a href="${image.largeImageURL}"><img class="photo" src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}" loading="lazy"/></a>
        <div class="info">
           <p class="info-item">
    <b>Likes</b> <span class="info-item-api"> ${image.likes} </span>
</p>
            <p class="info-item">
                <b>Views</b> <span class="info-item-api">${image.views}</span>  
            </p>
            <p class="info-item">
                <b>Comments</b> <span class="info-item-api">${image.comments}</span>  
            </p>
            <p class="info-item">
                <b>Downloads</b> <span class="info-item-api">${image.downloads}</span> 
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