let pokemonList = [];
let pokemonSearch = [];
let count = 20;
let lastLoop = 0;
let allPokemonList = [];
let allPokemonSearch = [];
let finishedLoading = false;

async function loadPokemonInBg() {
    for (let i = 0; i < 1008; i++) {

        let AllPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
        let responseAllPokemon = await fetch(AllPokemonUrl);
        let allPokemon = await responseAllPokemon.json();
        allPokemonList.push(allPokemon);
        allPokemonSearch = allPokemonList;

    }
    finishedLoading = true;
}

async function loadPokemon() {

    for (let i = lastLoop; i < count; i++) {

        let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
        let responsePokemon = await fetch(pokemonUrl);
        let currentPokemon = await responsePokemon.json();
        pokemonList.push(currentPokemon);
        pokemonSearch = pokemonList;
        loadPokemonIndex(i)
        loadTypes(i);
        
    }

}




function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function loadPokemonIndex(i) {
    let pokemonName = pokemonSearch[i]['name'];
    let pokemonImg = pokemonSearch[i]['sprites']['other']['official-artwork']['front_default'];
    let types = pokemonSearch[i]['types'];
    let bgType = types[0]['type']['name'];
    document.getElementById('pokemonContainer').innerHTML += generatePokeIndex(pokemonImg, pokemonName, i, bgType, pokemonSearch);
   

}


function loadTypes(i) {

    let types = pokemonSearch[i]['types'];
    for (let t = 0; t < types.length; t++) {
        let type = types[t]['type']['name'];
        document.getElementById(`infoElementContainer${i}`).innerHTML += generateTypeHTML(type);
    }
}



function loadTypesInfo(i) {
    let types = pokemonSearch[i]['types'];
    for (let t = 0; t < types.length; t++) {
        let type = types[t]['type']['name'];
        document.getElementById(`cardTypeContainer`).innerHTML += generateTypeHTML(type);
    }
}

function showPokemonStats(i) {
    let pokeStats = document.getElementById('pokemonStats');
    let pokemonName = pokemonSearch[i]['name'];
    let pokemonImg = pokemonSearch[i]['sprites']['other']['official-artwork']['front_default'];
    let pokemonHeight = pokemonSearch[i]['height'];
    let pokemonWeight = pokemonSearch[i]['weight'];
    let pokemonHp = pokemonSearch[i]['stats'][0]['base_stat'];
    let pokemonAttak = pokemonSearch[i]['stats'][1]['base_stat'];
    let pokemonDefense = pokemonSearch[i]['stats'][2]['base_stat'];
    let pokemonSpecialAttak = pokemonSearch[i]['stats'][3]['base_stat'];
    let pokemonSpecialDefense = pokemonSearch[i]['stats'][4]['base_stat'];
    let pokemonSpeed = pokemonSearch[i]['stats'][5]['base_stat'];
    let types = pokemonSearch[i]['types'];
    let bgType = types[0]['type']['name'];
    pokeStats.classList.remove('d-none');
    pokeStats.innerHTML = generatePokeStats(i, pokemonName, pokemonImg, pokemonHeight, pokemonWeight, pokemonHp, pokemonAttak, pokemonDefense, pokemonSpecialAttak, pokemonSpecialDefense, pokemonSpeed, bgType, pokemonSearch)

    loadTypesInfo(i);
    hidePokemonCards();
    ScrollToggle();
}



function closePokeStats() {
    document.getElementById('pokemonStats').classList.add('d-none');
    body.style.overflow = "";
    showPokemonCards();
}

function nextPokemon(i) {
    i++;
    if (i == pokemonSearch.length) {
        i = 0;
    }
    showPokemonStats(i);
}
function previousPokemon(i) {
    i--;
    if (i == -1) {
        i = pokemonSearch.length - 1;
    }
    showPokemonStats(i);
}

function searchPokemon() {

    let search = document.getElementById('searchPokemon').value;
    search = search.toLowerCase().trim();
    pokemonSearch = pokemonList;
    document.getElementById('pokemonContainer').innerHTML = ``;

    if (search.length > 0) {

        pokemonSearch = pokemonList.filter(p => includesSearch(p, search));

    }
    renderSearch();
    
}



function renderSearch() {

    for (let i = 0; i < pokemonSearch.length; i++) {
        loadPokemonIndex(i);
        loadTypes(i);

    }
}

function includesSearch(p, search) {
    return p.name.toLowerCase().startsWith(search) ||
        p.types.some(t => t.type.name.startsWith(search))
}


function loadMorePokemon() {

    
        document.getElementById('pokemonContainer').innerHTML = ``;
        pokemonSearch = pokemonList;
        renderSearch();
    

    lastLoop = count;
    count += 20;
    loadPokemon();
}

async function AdvancedSearch() {
    let search = document.getElementById('searchPokemon').value;
    search = search.toLowerCase().trim();
    console.log(search.length)

    if (search.length <= 0) {
        document.getElementById('pokemonContainer').innerHTML = generateLoadingInfo();
        document.getElementById('NoLoadText').innerHTML = `Ash doesn't know what Pokémon you have been searching for, please enter at least one letter.`
    } else {
        if (finishedLoading && search.length > 0) {
            document.getElementById('pokemonContainer').innerHTML = ``;
            
                allPokemonSearch = allPokemonList.filter(p => includesSearch(p, search));
                pokemonSearch = allPokemonSearch
            
            renderSearch();
        } else {
            document.getElementById('pokemonContainer').innerHTML = generateLoadingInfo();
            document.getElementById('NoLoadText').innerHTML = `Hey! Please wait one moment, Ash is now catching the Pokémon you need! Please try again in one moment.`;
        }
    }
}


