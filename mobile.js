let x = window.matchMedia("(max-width: 750px)")

function ToggleMobileSearch() {

    let headTitle = document.getElementById('headTitle');
    let searchBar = document.getElementById('searchPokemonBox');


    if (searchBar.style.display === 'none') {
        headTitle.classList.add('d-none-mobile');
        searchBar.style.display = "flex";
    } else {
        headTitle.classList.remove('d-none-mobile');
        searchBar.style.display = "none";

    }
}

function hidePokemonCards() {
    if (x.matches) {
        document.getElementById('pokemonContainer').classList.add('d-none');
        document.getElementById('loadMoreContainer').classList.add('d-none');
        document.getElementById('header').classList.add('d-none');
        document.getElementById('pokeCard').style = "margin-top: 0px"
        document.getElementById('BgStatClose').classList.add('d-none');
    } else {
        return
    }
}
function ScrollToggle() {
    if (!x.matches) {
       body.style.overflow = "hidden";
    } else {
        return
    }
}

function showPokemonCards() {
    document.getElementById('pokemonContainer').classList.remove('d-none')
    document.getElementById('loadMoreContainer').classList.remove('d-none')
    document.getElementById('header').classList.remove('d-none');
    document.getElementById('pokeCard').style = "margin-top: 80px"

}

