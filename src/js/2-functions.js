//Array para guardar lo que nos devuelve la API y para guardar los favoritos!
let gSeries = [];
let gFavoriteSeries = [];

// función para recorrer los objetos del Api y en el caso de no encontrar imagen y su nombre, que se pinte el placeholder o que salga el resultado.

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
}

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

// función que toma todas las series y permita hacer un click sobre cada una de las ellas y luego llame a la función hadleClickFav(event).

function addListenerToSeries() {
  const allSeries = document.querySelectorAll(".js-serie-item");
  for (const serie of allSeries) {
    serie.addEventListener("click", addSerieToFavorites);
  }
}

//funcion favorites
function addSerieToFavorites(event) {
  const serieElement = event.currentTarget; // <li>
  serieElement.classList.toggle("favorite");
  const favoriteSerieId = parseInt(serieElement.id);

  const favoriteSerie = gSeries.find((favorite) => favorite.show.id === favoriteSerieId);
  if (favoriteSerie !== undefined) //
  {
    if (gFavoriteSeries.find((favorite) => favorite.show.id === favoriteSerieId) === undefined) //
      gFavoriteSeries.push(favoriteSerie);
  }

  localStorage.setItem("favorites", JSON.stringify(gFavoriteSeries));
  displayFavoriteSeries();

  // onclick="deleteSerieFromFavorites(event, ${serie.id})"
}

function deleteSerieFromFavorites(event) {
  event.preventDefault();
  const selectedId = parseInt(event.currentTarget.parentElement.id);

  // borrar serie de lista de favoritos
  // const whenIAddedTheEvent = event.currentTarget;
  // const selectedId = parseInt(whenIAddedTheEvent.id);

  const favoriteIndex = gFavoriteSeries.findIndex(
    (favorite) => favorite.show.id === selectedId
  );

  if (favoriteIndex !== -1) gFavoriteSeries.splice(favoriteIndex, 1);

  localStorage.setItem("favorites", JSON.stringify(gFavoriteSeries));

  displayFavoriteSeries(deleteSerieFromFavorites);
}

// mostrar lista de series

function deleteAllFavoriteSeries() {
  gFavoriteSeries = [];
  localStorage.setItem("favorites", JSON.stringify(gFavoriteSeries));
  displayFavoriteSeries();
}
