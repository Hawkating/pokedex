const BASE_URL = "https://pokeapi.co/api/v2/";
let EVOLUTION_URL = "";
let currentPokemon = 0;
let caught = [];
let filtered = [];
let evolutionChain = [];
let myPokemonActive = false;

async function init(){
loadCaught();
let content = document.getElementById('content');
content.innerHTML = initializePokedexTemplate();
showLoadingSpinner();
let containerPokecard = document.getElementById('pokemon-container');
document.getElementById('load-more-button').addEventListener('click', loadMorePokemons)
for (let i = 1; i<26; i++){
   let pokemon = await loadPokemon(`/pokemon/${i}`);
   containerPokecard.innerHTML += pokemon;
   renderTypesArea(`/pokemon/${i}`);
   document.getElementById(`ability-info-${i}`).innerHTML = await loadAbility(`/pokemon/${i}`);
         currentPokemon ++;
      }
      if (caught){
      colorCaughtOnes();
   }
   hideLoadingSpinner();
}

function colorCaughtOnes(){
   for (let i = 0; i < caught.length; i++){
   document.getElementById(`caught-image-${caught[i]}`).classList.remove('grey');
}
}


function colorCaughtOnesActive(id){
   if (caught.includes(id)){
   document.getElementById(`caught-image-${id}`).classList.remove('grey');
   } else {
      document.getElementById(`caught-image-${id}`).classList.add('grey');
   }
}

async function loadPokemon(path=""){
   let response = await fetch(BASE_URL + path);
   let responseToJson = await response.json();
   let renderedCard = renderCard(responseToJson); 
   return renderedCard;
}

async function loadAbility(path=""){
   let response = await fetch(BASE_URL + path);
   let responseToJson = await response.json();
   let abilityInfo = await fetch (responseToJson["abilities"][0]["ability"]["url"]);
   let abilityInfoToJson = await abilityInfo.json();
   // let index = abilityInfoToJson["effect_entries"].findIndex() NOCHMAL DRAN WEIL DIE SPRACHE UNTERSCHIEDLICH IST

   return abilityInfoToJson["effect_entries"][1]["short_effect"];
   
}

async function loadMorePokemons(){
   showLoadingSpinner();
   let containerPokecard = document.getElementById('pokemon-container');
   let currentPokemonPlus25 = currentPokemon + 25;
   for (let i = currentPokemon + 1; i <= currentPokemonPlus25; i++){
      let pokemon = await loadPokemon(`/pokemon/${i}`);
      containerPokecard.innerHTML += pokemon;
      currentPokemon ++;
      renderTypesArea(`/pokemon/${i}`);
      document.getElementById(`ability-info-${i}`).innerHTML = await loadAbility(`/pokemon/${i}`);
      }
      if (caught){
         colorCaughtOnes();
      }
      hideLoadingSpinner();
      document.getElementById('load-more-button').classList.remove('d-none');
}


function playCry(forCry){
   console.log(forCry);
   let cry = new Audio(`${forCry}`);
   cry.play();

}

function catchPokemon(id){
   if (caught.includes(id)){
      let indexOfId = caught.indexOf(id);
      caught.splice(indexOfId, 1)
      if(myPokemonActive){
         showCaughtOnes();
      }
   } else {
   caught.push(id);
   }
   if (!myPokemonActive){
   colorCaughtOnesActive(id);
   saveCaught();
}
}

function saveCaught(){
   let caughtAsText = JSON.stringify(caught);
   localStorage.setItem('caught', caughtAsText);
}

function loadCaught(){
   let caughtToString = localStorage.getItem('caught');
   if (caughtToString){
   let caughtToArray = JSON.parse(caughtToString);
   for (let i = 0; i < caughtToArray.length; i++){
      caught.push(caughtToArray[i]);
   }
   }
}


async function showCaughtOnes(){
   myPokemonActive = true;
   document.getElementById('showMyPokemon').classList.add('d-none');
   document.getElementById('showAll').classList.remove('d-none');
   let containerPokecard = document.getElementById('pokemon-container');
   containerPokecard.innerHTML = ``;
   currentPokemon = 0;
   for (let i = 0; i<caught.length; i++){
      let pokemon = await loadPokemon(`/pokemon/${caught[i]}`);
      containerPokecard.innerHTML += pokemon;
      renderTypesArea(`/pokemon/${caught[i]}`);
      }
      
         if (caught){
         colorCaughtOnes();
      }
      document.getElementById('load-more-button').classList.add('d-none');
}

async function filterPokemon(){
   showLoadingSpinner();
   document.getElementById('showMyPokemon').classList.add('d-none');
   document.getElementById('showAll').classList.remove('d-none');
   let containerPokecard = document.getElementById('pokemon-container');
   containerPokecard.innerHTML = ``;
   pushFiltered();
   
   }

  async function renderContainerPokeCards(){
      let containerPokecard = document.getElementById('pokemon-container');
      let pokemon = await loadPokemon(`/pokemon/${filtered[0]}`);
      containerPokecard.innerHTML += pokemon;
      renderTypesArea(`/pokemon/${filtered[0]}`);
   }


async function pushFiltered(){
   filtered = [];
   let forFilter = document.getElementById('inputfield-filter');
   for(let i = 1; i<250; i++){
      let response = await fetch(BASE_URL + `/pokemon/${i}`);
      let responseToJson = await response.json();

      if(forFilter.value == i || forFilter.value == responseToJson['name']){
         filtered.push(i);
      }
   }
   document.getElementById('load-more-button').classList.add('d-none');
   renderContainerPokeCards();
   forFilter.value = ``;
   hideLoadingSpinner();
}

async function showEvolutionChain(id){
  
let evolutionArea = document.getElementById('evolution-area');
loadEvolutionChain(id);
// for (let i = 0; i< evolutionChain.length; i++){


// }
}

async function loadEvolutionChain(path="") {
   
   let response = await fetch(BASE_URL + "pokemon-species/" + path);
   let responseToJson = await response.json();
   let evolution = await fetch (responseToJson["evolution_chain"]["url"]);
   let evolutionToJson = await evolution.json();
   let evolution2 = await fetch (BASE_URL + "evolution-chain/" + evolutionToJson["id"]);
   let evolution2ToJson = await evolution2.json();
   renderEvolutionChain(evolution2ToJson.chain.species.name, evolution2ToJson.chain.evolves_to[0].species.name, evolution2ToJson.chain.evolves_to[0].evolves_to[0].species.name);
   // console.log(evolution2ToJson.chain.species.name);
   // console.log(evolution2ToJson.chain.evolves_to[0].species.name);
   // console.log(evolution2ToJson.chain.evolves_to[0].evolves_to[0].species.name);
   
}

function renderEvolutionChain(name1, name2, name3){
   let evolutionArea = document.getElementById('evolution-area');

   document.getElementById('dialog-background').classList.remove('d-none');
   evolutionArea.innerHTML = `${name1}, ${name2}, ${name3}`
}













function closeChain(){
   document.getElementById('dialog-background').classList.add('d-none');
}

function showLoadingSpinner(){
   document.getElementById('dialog-background-spinner').classList.remove('d-none');
}

function hideLoadingSpinner(){
   document.getElementById('dialog-background-spinner').classList.add('d-none');
}

function showAll(){
   myPokemonActive = false;
   document.getElementById('showMyPokemon').classList.remove('d-none');
   document.getElementById('showAll').classList.add('d-none');
   currentPokemon = 0;
   document.getElementById('pokemon-container').innerHTML = ``;
   loadMorePokemons();
}