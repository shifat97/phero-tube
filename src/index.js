let getCategoryData;
const categoryCardElement = document.getElementById('category-cards');
const noDataFound = document.getElementById('nodata-found');

async function fetchCategoryButton() {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    showCategoryButtonToUI(data.data);
}

function fetchCategoryByID(categoryID) {
    fetch(` https://openapi.programming-hero.com/api/videos/category/${categoryID}`)
        .then(response => response.json())
        .then(data => displayData(data));
}

const displayData = data => {
    if (data.data.length === 0) {
        showNoDataFound();
    } else {
        getCategoryData = data.data;
        showCategoryCardToUI(getCategoryData);
    }

}

const showCategoryButtonToUI = data => {
    const categoryElement = document.getElementById('category-buttons');

    data.forEach(category => {
        const categoryButton = `
            <div>
                <button onclick="fetchCategoryByID('${category.category_id}')" class="bg-gray-300 text-black py-1 px-6 rounded-sm focus:bg-red-500 focus:text-white">${category.category}</button>
            </div>
        `
        categoryElement.insertAdjacentHTML('beforeend', categoryButton);
    });
}

const sortCardByView = () => {
    if (getCategoryData === undefined) {
        return;
    }

    for (let category of getCategoryData) {
        let views = category.others.views.split('K');
        category.others.views = parseFloat(views[0]);
    }

    getCategoryData.sort((a, b) => a.others.views - b.others.views);

    for (let category of getCategoryData) {
        category.others.views = category.others.views + "K";
    }

    showCategoryCardToUI(getCategoryData);
}

const formatUploadTime = (seconds) => {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = seconds % 60;

    let formattedTime = "";

    if (hours > 0) {
        formattedTime += hours + "h ";
    }

    if (minutes > 0 || hours > 0) {
        formattedTime += minutes + "m ";
    }

    formattedTime += remainingSeconds + "s";

    return formattedTime;
}

const showNoDataFound = () => {
    noDataFound.innerHTML = " ";
    categoryCardElement.innerHTML = " ";

    const div = `
        <div class="flex flex-col justify-center items-center gap-4 mt-[100px]">
            <img src="./images/Icon.png">
            <h1>Oops!! Sorry, There is no content here</h1>
        </div>
    `
    noDataFound.insertAdjacentHTML('beforeend', div);
}

const showCategoryCardToUI = data => {
    noDataFound.innerHTML = " ";
    categoryCardElement.innerHTML = " ";

    data.forEach(category => {
        const uploadTime = category.others.posted_date ? formatUploadTime(category.others.posted_date) : " ";

        const categoryCard = `
            <div>
                <div class="card-img-container">
                    <img class="card-img rounded-md" src="${category.thumbnail}">
                    <p class="upload-time ${category.others.posted_date ? 'block' : 'hidden'}">${uploadTime} ago</p>
                </div>
                <div class="mt-4 flex gap-4">
                    <div>
                        <img class="author-img" src="${category.authors[0].profile_picture}">
                    </div>
                    <div>
                        <h1 class="text-xl font-bold">${category.title}</h1>
                        <div class="flex items-center gap-2">
                            <p class="text-gray-500 font-light">${category.authors[0].profile_name}</p>
                            <img class="${category.authors[0].verified ? 'block' : 'hidden'}" src="./images/verified.png">
                        </div>
                        <p class="text-gray-500 font-light">${category.others.views} views</p>
                    </div>
                </div>
            </div>
        `
        categoryCardElement.insertAdjacentHTML('beforeend', categoryCard);
    })
}

fetchCategoryButton();