document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('inputBuscar');
    const searchButton = document.getElementById('btnBuscar');
    const resultsContainer = document.getElementById('contenedor');

    searchButton.addEventListener('click', () => {
        const searchText = searchInput.value.trim();

        if (searchText === '') {
            alert('Por favor, ingrese un término de búsqueda.');
            return;
        }

        const apiUrl = `https://images-api.nasa.gov/search?q=` + searchText;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                resultsContainer.innerHTML = '';

                if (data.collection && data.collection.items.length > 0) {
                    data.collection.items.forEach(item => {
                        const imageUrl = item.links[0].href;
                        const title = item.data[0].title;
                        const description = item.data[0].description || 'No disponible';
                        const dateCreated = item.data[0].date_created || 'No disponible';

                        const resultItem = document.createElement('div');
                        resultItem.classList.add('col-md-4', 'result-item'); // Add col-md-4 class
                        resultItem.innerHTML = `
                            <div class="card mb-4">
                                <img src="${imageUrl}" class="card-img-top" alt="${title}">
                                <div class="card-body">
                                    <h2 class="card-title">${title}</h2>
                                    <p class="card-text"><strong>Descripción:</strong> ${description}</p>
                                    <p class="card-text"><strong>Fecha:</strong> ${dateCreated}</p>
                                </div>
                            </div>
                        `;

                        resultsContainer.appendChild(resultItem);
                    });
                } else {
                    resultsContainer.innerHTML = '<p>No se encontraron resultados.</p>';
                }
            })
            .catch(error => {
                console.error('Error al realizar la solicitud:', error);
                resultsContainer.innerHTML = '<p>Error al buscar imágenes.</p>';
            });
    });
});