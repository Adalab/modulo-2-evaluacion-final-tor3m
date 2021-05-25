// función principal al darle al botón de buscar, que devuelva la API y que pinte el resultado.

function handleClickSearch(event) {
  event.preventDefault();

  fetch(`//api.tvmaze.com/search/shows?q=${enterYourSearchInput.value}`)
    .then((response) => response.json())
    .then((data) => {
      gSeries = data;
      displayAllSeries();
      addListenerToSeries();
    });
  //Debe contener todas las funciones adicionales
}

buttonSearch.addEventListener("click", handleClickSearch);