document.getElementById("btnBuscar").addEventListener("click", function() {
    const inputText = document.getElementById("inputBuscar").value;
    const apiUrl = "https://images-api.nasa.gov/search?q=" + inputText;
  
    fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        const images = data.collection.items;
        const contenedor = document.getElementById("contenedor");

        contenedor.innerHTML = "";
  
        images.forEach(function(image) {
          const imageUrl = image.links[0].href;
          const title = image.data[0].title;
          const description = image.data[0].description;
          const dateCreated = image.data[0].date_created;
  
          const fila = document.createElement('div');
          fila.classList.add('col-4');
                  
          const imageElement = document.createElement("img");
          imageElement.src = imageUrl;
  
          const titleElement = document.createElement("h3");
          titleElement.textContent = title;
  
          const descriptionElement = document.createElement("p");
          descriptionElement.textContent = description;
  
          const dateElement = document.createElement("p");
          dateElement.textContent = "Fecha de creación: " + dateCreated;
  
          const imageContainer = document.createElement("div");
          imageContainer.appendChild(imageElement);
          imageContainer.appendChild(titleElement);
          imageContainer.appendChild(descriptionElement);
          imageContainer.appendChild(dateElement);
  
          contenedor.appendChild(imageContainer);
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  });