export const renderList = function renderList(images) {
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