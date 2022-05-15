const auth = "563492ad6f91700001000001e4cdfcccc6e043259f7bed7b78953740";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;

// console.log("auth")

function curatedPhotos() {
    fetch("https://api.pexels.com/v1/curated?per_page=25", {
            method: "GET",
            headers: {
                Accept: "Application/json",
                Authorization: auth
            }
        })
        .then(res => res.json())

        .then(data => displayPhoto(data))
}
curatedPhotos()

function displayPhoto(photos) {
    let allPhotos = photos.photos
    allPhotos.forEach(photo => {
        // console.log(photo)
        const galleryImage = document.createElement("div")
        galleryImage.classList.add("gallery-img")
        galleryImage.innerHTML = `
    
    <img src="${photo.src.large}" alt="">
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href="${photo.src.original}">download</a>
            
        </div>
            
    
    `
        gallery.appendChild(galleryImage)
    });
}

function searchPhotos(query) {
    fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=25`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: auth
            }
        })
        .then(res => res.json())
        .then(data => displaySearch(data))
}
searchPhotos()

function displaySearch(query) {
    let allPhotos = query.photos
    // console.log(allPhoto)
    allPhotos.forEach(photo => {
        // console.log(photo)
        const galleryImage = document.createElement("div")
        galleryImage.classList.add("gallery-img")
        galleryImage.innerHTML = `
        
        <img src="${photo.src.large}" alt="">
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href="${photo.src.original}">download</a>
            
        </div>
        
        `
        gallery.appendChild(galleryImage)
    });

}

searchInput.addEventListener("input", updateSearch)

function updateSearch(e) {
    // console.log(e.target.value)
    searchValue = (e.target.value)
}

form.addEventListener("submit", (e) => {
    gallery.innerHTML = ""
    e.preventDefault()
    searchPhotos(searchValue)
    searchInput.value = ""
})