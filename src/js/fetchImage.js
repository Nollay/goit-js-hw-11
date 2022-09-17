export const fetchImages = async (inputValue, pageNumb) => {
return await fetch(
    `https://pixabay.com/api/?key=29947512-f3d06c4dc09f4cffc6828f6d0&q=${inputValue}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${pageNumb}`
    )
    .then(async response => {
    if (!response.ok) {
        if (response.status === 404) {
        return [];
        }
        throw new Error(response.status);
    }
    return await response.json();
    })
    .catch(error => {
    console.error(error);
    });
};