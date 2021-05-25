// Función principal al darle al botón de buscar me devuelve el resultado, la lista de series.

function handleClickSearch(event) {
  event.preventDefault();

  fetch(`//api.tvmaze.com/search/shows?q=${enterYourSearchInput.value}`)
    .then((response) => response.json())
    .then((data) => {
      gSeries = data;
      displayAllSeries();
    });
}

buttonSearch.addEventListener("click", handleClickSearch);
//Al cargar la página me devuelve los favoritos que guarde em el localStorage.
gFavoriteSeries = JSON.parse(localStorage.getItem("favorites"));
if (gFavoriteSeries === null) gFavoriteSeries = [];

displayFavoriteSeries();
