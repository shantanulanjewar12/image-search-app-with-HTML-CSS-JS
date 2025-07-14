const accessKey = '6B1CGYzgqbLvoPdZQS6jHt9MN6UJiuntuOPY-KSTWW8';
//keep it confidential

const searchForm = document.querySelector('form');
const searchInput = document.querySelector('.search-input');
const imagesContainer = document.querySelector('.images-container');
const loadMoreBtn = document.querySelector('.loadMoreBtn');


let page = 1;

//Function to fetch images using unsplash api
const fetchImages = async (query, pageNo) => {

    try {


        if (pageNo === 1) {
            imagesContainer.innerHTML = '';
        }

        const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}  `;

        const response = await fetch(url);
        const data = await response.json();

        if (data.results.length > 0) {
            data.results.forEach(photo => {

                //Creating Img div
                const imageElement = document.createElement('div');
                imageElement.classList.add('imageDiv');
                imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;

                //Creating overlay - black part on the pic
                const overlayElement = document.createElement('div');
                overlayElement.classList.add('overlay');


                //creating overlay text
                const overlayText = document.createElement('h3');
                overlayText.innerHTML = photo.alt_description || 'No Description';

                overlayElement.appendChild(overlayText);

                imageElement.appendChild(overlayElement);

                imagesContainer.appendChild(imageElement);

            });
        }
        else {
            imagesContainer.innerHTML = `<h2>No Image Found.</h2>`;

            if(loadMoreBtn.style.display === "block")
                {
                        loadMoreBtn.style.display = "none";
                }

        }

    } 
    
    catch (error) {
        imagesContainer.innerHTML = `<h2>Failed to fetch images.Please try again later.</h2>`;       
    }




    if (data.total_pages == pageNo) {
        loadMoreBtn.style.display = "none";
    }
    else {
        loadMoreBtn.style.display = "block";
    }

}


searchForm.addEventListener('submit', (e) => {

    //to stop the from from auto submitting
    e.preventDefault();

    //deletes the starting and ending spaces
    const inputText = searchInput.value.trim();

    if (inputText !== '') {
        fetchImages(inputText, page);
    }
    else {
        imagesContainer.innerHTML = `<h2>Please enter a search query.</h2>`;
        
        if(loadMoreBtn.style.display === "block")
        {
                loadMoreBtn.style.display = "none";
        }
    }


})


//Adding Event Listner to Load More BTn to fetch more btn
loadMoreBtn.addEventListener('click', () => {
    fetchImages(searchInput.value.trim(), ++page);
})









//https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY