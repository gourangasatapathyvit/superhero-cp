const BASE_URL = `https://akabab.github.io/superhero-api/api`

const newHeroButton = document.getElementById('newHeroButton')

const heroImageDiv = document.getElementById('heroImage')

const searchButton = document.getElementById('searchButton')

const searchInput = document.getElementById('searchInput')

const getSuperHero = (id, name) => {
    fetch(`${BASE_URL}/id/${id}.json`)
        .then(response => response.json())
        .then(json => {
            console.log(json.powerstats, json)
            const superHero = json
            showHeroInfo(superHero)
        })
}

const statToEmoji = {
    intelligence: '🧠',
    strength: '💪',
    speed: '⚡',
    durability: '🏋️‍♂️',
    power: '📊',
    combat: '⚔️',
}

const showHeroInfo = (character) => {
    const name = `<h2>${character.name}</h2>`

    const img = `<img src="${character.images.md}" height=200 width=200/>`

    const stats = Object.keys(character.powerstats).map(stat => {
        return `<p>${statToEmoji[stat]} ${stat.toUpperCase()}: ${character.powerstats[stat]}</p>`
    }).join('')

    heroImageDiv.innerHTML = `${name}${img}${stats}`
    // console.log(heroImageDiv.innerHTML, "===", heroImageDiv)
}

const getSearchSuperHero = (name) => {
    console.log(searchInput.value)
    let allJsonDataUrl = `${BASE_URL}/all.json`
    let allJsonData = ""


    fetch(allJsonDataUrl)
        .then(response => response.json())
        .then(json => {
            allJsonData = json

            for (let i of allJsonData) {
                if (i.name === name) {
                    showHeroInfo(i);
                    break;
                }
            }
        })


}

const randomHero = () => {
    const numberOfHeroes = 563
    return Math.floor(Math.random() * numberOfHeroes) + 1
}

newHeroButton.onclick = () => getSuperHero(randomHero())

searchButton.onclick = () => getSearchSuperHero(searchInput.value)
