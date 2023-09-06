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
    
        // Crear un div que actuará como fila (row) para las cartas
        let row = document.createElement('div');
        row.classList.add('row');
    
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const image = item.links[0].href;
            const title = item.data[0].title;
            const description = item.data[0].description;
            const date = item.data[0].date_created;
    
            // Crear una columna para cada carta
            const col = document.createElement('div');
            col.classList.add('col-md-4', 'mb-3'); // 'mb-3' para agregar margen inferior a las columnas
    
            const card = document.createElement('div');
            card.classList.add('card');
    
            const cardImage = document.createElement('img');
            cardImage.classList.add('card-img-top');
            cardImage.src = image; // Establecer la imagen
            cardImage.alt = title; // Establecer el texto alternativo
            cardImage.style.height = '200px'; // Establecer una altura fija para la imagen
    
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            cardBody.innerHTML = `
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
                <p class="card-text"><small class="text-muted">${date}</small></p>
            `;
    
            card.appendChild(cardImage);
            card.appendChild(cardBody);
    
            col.appendChild(card);
            row.appendChild(col);
    
            // Después de agregar tres cartas, crea una nueva fila
            if ((i + 1) % 3 === 0) {
                container.appendChild(row);
                row = document.createElement('div');
                row.classList.add('row');
            }
        }
    
        // Asegúrate de agregar la última fila si no hay un número exacto de cartas
        if (items.length % 3 !== 0) {
            container.appendChild(row);
        }
    }
});