const BASE_URL = "https://pokeapi.co/api/v2/";

async function init(){
let content = document.getElementById('content');
content.innerHTML = initializePokedexTemplate();
let pokemon = await loadPokemon("/pokemon/1");



content.innerHTML += pokemon["name"];
}

async function loadPokemon(path=""){
    // return new Promise ((resolve, reject) => {

    // })
   let response = await fetch(BASE_URL + path);
   let responseToString = await response.json();
   console.log(responseToString);
   return responseToString;

   

}