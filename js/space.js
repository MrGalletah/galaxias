document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('inputBuscar');
    const searchBtn = document.getElementById('btnBuscar');
    const container = document.getElementById('contenedor');

    searchBtn.addEventListener('click', function () {
        const search = searchInput.value;
        if (search) {
            const API = `https://images-api.nasa.gov/search?q=${search}`;
            fetch(API)
                .then((response) => response.json())
                .then((data) => {
                    showData(data);
                })
                .catch((error) => {
                    console.error('ERROR', error);
                });
        }
    });

    function showData(data) {
        container.innerHTML = '';
        const items = data.collection.items;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const image = item.links[0].href;
            const title = item.data[0].title;
            const description = item.data[0].description;
            const date = item.data[0].date_created;

            const card = document.createElement('div');
            card.classList.add('card', 'mb-3');
            card.innerHTML = `
              <img src="${image}" class="card-img-top" alt="${title}">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
                <p class="card-text"><small class="text-muted">${date}</small></p>
              </div>
            `;

            container.appendChild(card);
        }
    }
});