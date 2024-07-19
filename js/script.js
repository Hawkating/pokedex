const BASE_URL = "https://pokeapi.co/api/v2/";


async function init(){
let content = document.getElementById('content');
content.innerHTML = initializePokedexTemplate();

for (let i = 1; i<500; i++){
let pokemon = await loadPokemon(`/pokemon/${i}`);

 content.innerHTML += pokemon;

//  let pokemonName = (`${BASE_URL}/pokemon/${i}["name"]`);
// checkForBackgroundImage(`/pokemon/${i}`);

}



}

async function loadPokemon(path=""){
   let response = await fetch(BASE_URL + path);
   let responseToJson = await response.json();
   let renderedCard = renderCard(responseToJson); 
   
   return renderedCard;

}

// async function checkForBackgroundImage(path=""){
//     let response = await fetch(BASE_URL + path);
//     let responseToJson = await response.json();
//     responseToJson.classList.add
    //     if (responseToJson["types"][0]["type"]["name"] == "grass"){
    //    document.getElementById(`pokemon-image-container-${responseToJson["name"]}`).classList.add('image-background-grass');
    //     } 
    //     if (responseToJson["types"][0]["type"]["name"] == "fire"){
    //         document.getElementById(`pokemon-image-container-${responseToJson["name"]}`).classList.add('image-background-fire');
    //          } 
    //          if (responseToJson["types"][0]["type"]["name"] == "water"){
    //             document.getElementById(`pokemon-image-container-${responseToJson["name"]}`).classList.add('image-background-water');
    //              } 
    // }
