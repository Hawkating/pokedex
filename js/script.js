const BASE_URL = "https://pokeapi.co/api/v2/";
let currentPokemon = 0;
let caught = [];

async function init(){
let content = document.getElementById('content');
content.innerHTML = initializePokedexTemplate();
let containerPokecard = document.getElementById('pokemon-container');
document.getElementById('load-more-button').addEventListener('click', loadMorePokemons)
for (let i = 1; i<26; i++){
   let pokemon = await loadPokemon(`/pokemon/${i}`);
   containerPokecard.innerHTML += pokemon;
   currentPokemon ++;
   }
// colorCaughtOnes();
}

// function colorCaughtOnes(){
//    for (let i = 1; i < currentPokemon; i++){
//    if (caught.includes(i)){
//          document.getElementById(`caught-image-${i}`).classList.remove('grey');
//    }
//    }
// }


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


async function loadMorePokemons(){
   let containerPokecard = document.getElementById('pokemon-container');
   let currentPokemonPlus25 = currentPokemon + 25;
   for (let i = currentPokemon + 1; i <= currentPokemonPlus25; i++){
      let pokemon = await loadPokemon(`/pokemon/${i}`);
      containerPokecard.innerHTML += pokemon;
      currentPokemon ++;
      }
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
   } else {
   caught.push(id);
   }
   colorCaughtOnesActive(id);
}