function initializePokedexTemplate(){
return /*html*/`
    <header>
        <img src="./img/logo.png">
    </header>
    <div id="pokemon-container"></div
    `
}

function renderCard(responseAsJson){
    console.log(responseAsJson);
return /*html*/ `
<div class="pokemon-card" id="pokemon-card-${responseAsJson['name']}">
    <span><b>${responseAsJson["name"]}</b></span>
    <div class="pokemon-image-container image-background-${responseAsJson['types'][0]['type']['name']}" id="pokemon-image-container-${responseAsJson['name']}">
        <img class="pokemon-image" src="${responseAsJson["sprites"]["other"]["dream_world"]["front_default"]}">
    </div>
</div>
`


}

