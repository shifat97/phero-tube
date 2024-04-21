async function fetchCategory() {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    showCategoryButtonToUI(data.data);
}

const showCategoryButtonToUI = data => {
    const categoryElement = document.getElementById('category-buttons');

    data.forEach(category => {
        const categoryButton = `
            <div>
                <button class="bg-gray-300 text-black py-1 px-6 rounded-sm focus:bg-red-500 focus:text-white">${category.category}</button>
            </div>
        `
        categoryElement.insertAdjacentHTML('beforeend', categoryButton);
    });
}

fetchCategory();