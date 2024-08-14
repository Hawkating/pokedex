function initializePokedexTemplate(){
return /*html*/`
<div id="dialog-background" class="dialog-bg d-none">
    
    <div id="evolution-area">
    </div>
    <div class="close-chain" onclick="closeChain()">close evolution-chain</div>
</div>
<div id="dialog-background-spinner" class="dialog-bg d-none">
    <img class="loading-spinner rotate" src="./img/pokeball.png">
    <span>loading...</span>
</div>

    <header>
        <img src="./img/logo.png">
    </header>
    <section class="filter-section">
    <div><input id="inputfield-filter" placeholder="ID or name"><button onclick="filterPokemon()">search</button></div><div onclick="showCaughtOnes()" class="" id="showMyPokemon">show my Pokèmon</div><div onclick="showAll()" class="d-none" id="showAll">show all</div>
    <div id="pokemon-container"></div>
    </section>
    <div class="load-more-area"><button id="load-more-button">load more</button></div>
    `
}

function renderCard(responseAsJson){
return /*html*/ `
<div class="pokemon-card card-background-${responseAsJson['types'][0]['type']['name']}" id="pokemon-card-${responseAsJson['name']}">
    <div class="header-for-card">
        <h2><b>${responseAsJson["name"]}</b></h2><span><b>#${responseAsJson["id"]}</b></span>
    </div>
    <div class="pokemon-image-container image-background-${responseAsJson['types'][0]['type']['name']}" id="pokemon-image-container-${responseAsJson['name']}">
        <img onclick="playCry('${responseAsJson['cries']['latest']}')" class="pokemon-image" src="${responseAsJson["sprites"]["other"]["dream_world"]["front_default"]}">
    </div>
    <div class="types-area" id="types-area-${responseAsJson['id']}"></div>
    <div class="weight-height"><span>weight: ${responseAsJson["weight"]}</span><span>height: ${responseAsJson["height"]}</span></div>
    <div class="card-ability-area">
    <div><span><b>${responseAsJson["abilities"][0]["ability"]["name"]}:</b></span><p id="ability-info-${responseAsJson["id"]}"></p></div>
    </div>
    <div class="card-bottom-area">
     <div class="evolution-chain hidden" onclick="showEvolutionChain(${responseAsJson['id']})">show evolution-chain</div>       <div class="catch-area"><b>caught:</b> <img id="caught-image-${responseAsJson["id"]}" onclick="catchPokemon('${responseAsJson["id"]}')" class="caught-image grey" src="./img/pokeball.png"></div>
    </div>
</div>
`
}

async function renderTypesArea(path=""){
    let response = await fetch(BASE_URL + path);
    let responseToJson = await response.json();
    
    for (let i = 0; i<responseToJson['types'].length; i++){
    document.getElementById(`types-area-${responseToJson['id']}`).innerHTML +=  /*html*/ `
    <img class="type-pic" src="./img/type_${responseToJson['types'][i]['type']['name']}.png">
    `;
    }
}



// {
//     "baby_trigger_item": null,
//     "chain": {
//       "evolution_details": [],
//       "evolves_to": [
//         {
//           "evolution_details": [
//             {
//               "gender": null,
//               "held_item": null,
//               "item": null,
//               "known_move": null,
//               "known_move_type": null,
//               "location": null,
//               "min_affection": null,
//               "min_beauty": null,
//               "min_happiness": null,
//               "min_level": 16,
//               "needs_overworld_rain": false,
//               "party_species": null,
//               "party_type": null,
//               "relative_physical_stats": null,
//               "time_of_day": "",
//               "trade_species": null,
//               "trigger": {
//                 "name": "level-up",
//                 "url": "https://pokeapi.co/api/v2/evolution-trigger/1/"
//               },
//               "turn_upside_down": false
//             }
//           ],
//           "evolves_to": [
//             {
//               "evolution_details": [
//                 {
//                   "gender": null,
//                   "held_item": null,
//                   "item": null,
//                   "known_move": null,
//                   "known_move_type": null,
//                   "location": null,
//                   "min_affection": null,
//                   "min_beauty": null,
//                   "min_happiness": null,
//                   "min_level": 36,
//                   "needs_overworld_rain": false,
//                   "party_species": null,
//                   "party_type": null,
//                   "relative_physical_stats": null,
//                   "time_of_day": "",
//                   "trade_species": null,
//                   "trigger": {
//                     "name": "level-up",
//                     "url": "https://pokeapi.co/api/v2/evolution-trigger/1/"
//                   },
//                   "turn_upside_down": false
//                 }
//               ],
//               "evolves_to": [],
//               "is_baby": false,
//               "species": {
//                 "name": "charizard",
//                 "url": "https://pokeapi.co/api/v2/pokemon-species/6/"
//               }
//             }
//           ],
//           "is_baby": false,
//           "species": {
//             "name": "charmeleon",
//             "url": "https://pokeapi.co/api/v2/pokemon-species/5/"
//           }
//         }
//       ],
//       "is_baby": false,
//       "species": {
//         "name": "charmander",
//         "url": "https://pokeapi.co/api/v2/pokemon-species/4/"
//       }
//     },
//     "id": 2
//   }