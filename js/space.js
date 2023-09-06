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
      const url = `https://images-api.nasa.gov/search?q=`
      const apiUrl = url + searchText;

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
                      resultItem.classList.add('result-item');
                      resultItem.innerHTML = `
                          <img src="${imageUrl}" alt="${title}">
                          <h2>${title}</h2>
                          <p><strong>Descripción:</strong> ${description}</p>
                          <p><strong>Fecha:</strong> ${dateCreated}</p>
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
