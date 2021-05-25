// Array para guardar las series que nos devuelve la API.
let gSeries = [];
// Array para guardar los favoritos!
let gFavoriteSeries = [];

// Función para pintar todas las series.
function displayAllSeries() {
  allSeriesListElements.innerHTML = ``;

  if (gSeries.length === 0) 
  {
    allSeriesListElements.innerHTML = `<li><p>No encontramos tú búsqueda</p></li>`;
    return;
  }

  for (let i = 0; i < gSeries.length; i++) {
    const serie = gSeries[i]
    const show = serie.show;
    const showImg = show.image
      ? show.image.medium
      : "https://via.placeholder.com/210x295";

    allSeriesListElements.innerHTML += `
          <li id=${show.id} class="series__list--item js-serie-item">
            <h2 class="seriers__item-name">${show.name}</h2>
            <img class="seriers__item-image" src="${showImg}" />
          </li>`;
  }

  // Vincular el evento click con la función addSerieToFavorites.
  const allSeries = document.querySelectorAll(".js-serie-item");
  for (const serie of allSeries) {
    serie.addEventListener("click", addSerieToFavorites);
  }
}

// Función para pintar todas las series favoritas.
function displayFavoriteSeries() {
  favoriteSeriesListElements.innerHTML = ``;

  for (let i = 0; i < gFavoriteSeries.length; i++) {
    const serie = gFavoriteSeries[i]
    const show = serie.show;
    const showImg = show.image
      ? show.image.medium
      : "https://via.placeholder.com/210x295";

    favoriteSeriesListElements.innerHTML += `
          <li id=${show.id} class="series__favorites-list--item" >
            <h2 class="series__item-name">${show.name}</h2>
            <img class="series__item-image" src="${showImg}" />
            <button class="js-serie-delete-item">x</button>
          </li> 
          `;
  }

 const deleteButtons = document.querySelectorAll(".js-serie-delete-item");
  for (const deleteButton of deleteButtons) {
    deleteButton.addEventListener("click", deleteSerieFromFavorites);
  }
}

//Funcion agregar la serie a la lista de favoritos.
function addSerieToFavorites(event) {
  
  const serieElement = event.currentTarget; // <li>
  //Añadir clase favorite
  serieElement.classList.toggle("favorite");
   // Convertir el id de texto a número    
  const favoriteSerieId = parseInt(serieElement.id);

  // Buscar serie con el id `favoriteSerieId`
  const favoriteSerie = gSeries.find((favorite) => favorite.show.id === favoriteSerieId);
  if (favoriteSerie !== undefined) // si existe la serie
  {
    if (gFavoriteSeries.find((favorite) => favorite.show.id === favoriteSerieId) === undefined) // evitar duplicados!
      gFavoriteSeries.push(favoriteSerie);
  }

  // Guardar array de favoritos en el localStorage como texto usando JSON.stringify para convertirlo a texto.
  localStorage.setItem("favorites", JSON.stringify(gFavoriteSeries));

  // Mostrar lista de favoritos
  displayFavoriteSeries();
}

function deleteSerieFromFavorites(event) {
  event.preventDefault();
  const selectedId = parseInt(event.currentTarget.parentElement.id);

  //  Borrar serie de lista de favoritos
  const favoriteIndex = gFavoriteSeries.findIndex(
    (favorite) => favorite.show.id === selectedId
  );
  
  if (favoriteIndex === -1)
    return

  // Eliminar
  gFavoriteSeries.splice(favoriteIndex, 1);

  // Guardar cambios
  localStorage.setItem("favorites", JSON.stringify(gFavoriteSeries));

  // Mostrar lista
  displayFavoriteSeries(deleteSerieFromFavorites);
}

// Limpiar lista de favoritos
function deleteAllFavoriteSeries() {
  gFavoriteSeries = [];
  localStorage.setItem("favorites", JSON.stringify(gFavoriteSeries));
  displayFavoriteSeries();
}
