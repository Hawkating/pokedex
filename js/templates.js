function initializePokedexTemplate(){
return /*html*/`
    <header>
        <img src="./img/logo.png">
    </header>
    <section>
    <div>search</div>
    <div id="pokemon-container"></div>
    </section>
    <div><button id="load-more-button">load more</button></div>
    `
}

function renderCard(responseAsJson){
return /*html*/ `
<div class="pokemon-card card-background-${responseAsJson['types'][0]['type']['name']}" id="pokemon-card-${responseAsJson['name']}">
    <div class="header-for-card">
        <span><b>${responseAsJson["name"]}</b></span><span><b>#${responseAsJson["id"]}</b></span>
    </div>
    <div class="pokemon-image-container image-background-${responseAsJson['types'][0]['type']['name']}" id="pokemon-image-container-${responseAsJson['name']}">
        <img onclick="playCry('${responseAsJson['cries']['latest']}')" class="pokemon-image" src="${responseAsJson["sprites"]["other"]["dream_world"]["front_default"]}">
    </div>
    <div>caught? <img id="caught-image-${responseAsJson["id"]}" onclick="catchPokemon('${responseAsJson["id"]}')" class="caught-image grey" src="./img/pokeball.png"></div>
</div>
`


}

