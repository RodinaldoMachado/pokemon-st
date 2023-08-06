const telaInicial = document.querySelector('.tela-inicial')
const telaFinal = document.querySelector('.tela-final')
const msgFinal = document.querySelector('.msg-final')
const listaTimePokemon = document.querySelector('.lista-time-pokemon')

var nomeDoPlayer = ''
var nomeDoEnimy = ''

var pokemonsPlayer = [];
var pokemonPlayer = ''
var pokemonEnimy = ''
//CORES TIPOS------------------------------------------------------

var cores = {
    normal: ' linear-gradient(163deg, rgba(148,148,150,1) 31%, rgba(189,188,188,1) 61%, rgba(240,240,240,1) 98%)',
    grass: 'linear-gradient(163deg, rgba(62,172,51,1) 31%, rgba(47,207,32,1) 61%, rgba(26,245,4,1) 98%)',
    fire: 'linear-gradient(163deg, rgba(212,109,39,1) 31%, rgba(246,115,27,1) 61%, rgba(251,105,6,1) 98%)',
    water: 'linear-gradient(163deg, rgba(59,97,163,1) 31%, rgba(35,108,247,1) 61%, rgba(83,145,242,1) 98%)',
    flying: 'linear-gradient(163deg, rgba(55,119,230,1) 31%, rgba(146,164,196,1) 61%, rgba(148,148,148,1) 98%)',
    bug: 'linear-gradient(163deg, rgba(50,60,1,1) 12%, rgba(117,145,49,1) 61%, rgba(150,182,89,1) 93%)',
    fairy: 'linear-gradient(163deg, rgba(255,81,158,1) 31%, rgba(255,148,195,1) 61%, rgba(255,219,235,1) 98%)',
    figthing: 'linear-gradient(163deg, rgba(190,8,8,1) 31%, rgba(167,6,6,1) 61%, rgba(254,7,7,1) 98%)',
    dragon: 'linear-gradient(163deg, rgba(21,5,92,1) 22%, rgba(35,6,167,1) 48%, rgba(254,7,24,1) 89%)',
    ghost: 'linear-gradient(163deg, rgba(24,5,42,1) 22%, rgba(31,22,73,1) 48%, rgba(96,83,163,1) 89%)',
    ground: 'linear-gradient(163deg, rgba(102,53,1,1) 22%, rgba(184,104,5,1) 48%, rgba(196,162,1,1) 69%)',
    psychic: 'linear-gradient(163deg, rgba(248,100,255,1) 12%, rgba(254,73,213,1) 61%, rgba(250,105,220,1) 93%)',
    steel: 'linear-gradient(163deg, rgba(54,53,53,1) 12%, rgba(143,143,143,1) 52%, rgba(191,188,189,1) 69%',
    dark: 'linear-gradient(163deg, rgba(0,0,0,1) 12%, rgba(59,58,58,1) 61%, rgba(91,91,91,1) 93%)',
    ice: 'linear-gradient(163deg, rgba(19,173,227,1) 12%, rgba(179,219,250,1) 61%, rgba(193,251,251,1) 93%)',
    poison: 'linear-gradient(163deg, rgba(154,55,203,1) 12%, rgba(186,132,210,1) 61%, rgba(229,193,251,1) 93%)',
    rock: 'linear-gradient(163deg, rgba(170,102,27,1) 12%, rgba(114,113,115,1) 61%, rgba(225,223,226,1) 93%)',
    electric: 'linear-gradient(163deg, rgba(204,205,9,1) 12%, rgba(220,228,23,1) 61%, rgba(239,249,4,1) 93%)',
    white: '#fff',
    black: '#000'
}

var corFundo = cores.ghost
var corLetra = cores.white
var corFundoImg = '#ccc'


//CORES TIPOS------------------------------------------------------

//FUNÇOES----------------------------------------------------------

function opacity(par) {
    if (par == false) {
        return 1
    }else if (par == true) {
        return 0.3
    }
}

function mostrarListaPokemon() {
    for (let i = 0; i < pokemonsPlayer.length; i++) {
        listaTimePokemon.innerHTML +=`
        <div class="pokemon-single" style="opacity:${opacity(pokemonsPlayer[i].perdeu)};">
            <p>${pokemonsPlayer[i].nome}</p>
            <img src="${pokemonsPlayer[i].img}" alt="">
        </div>
        `
        
    }
}

async function buscaPokemon(n) {
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${n}`)
    const data = await APIresponse.json()
    return data
}

function randomPokemon() {
    let rand = Math.floor(Math.random() * 1009 + 1)
    return rand
}

async function mostrarPokemonPlayer(n) {
    let pokemon = await buscaPokemon(n)
    pokemonEnimy = await buscaPokemon(randomPokemon())
    let nomeM = pokemon.name[0].toUpperCase() + pokemon.name.substring(1)
    fundoPorTipo(pokemon.types[0].type.name)
    cartaPlayer.style.background = corFundo
    cartaPlayer.style.color = corLetra
    cartaPlayerNome.innerHTML = nomeM;
    cartaPlayerId.innerHTML = pokemon.id;
    cartaPlayerImg.src = pokemon.sprites.other['official-artwork'].front_default;
    cartaPlayerImg.style.background = corFundoImg
    cartaPlayerAtaq.innerHTML = `Ataq: ${pokemon.stats[1].base_stat}`;
    cartaPlayerDef.innerHTML = `Def: ${pokemon.stats[2].base_stat}`;
    cartaPlayerAtaqEsp.innerHTML = `Ataq Esp: ${pokemon.stats[3].base_stat}`;
    cartaPlayerDefEsp.innerHTML = `Def Esp: ${pokemon.stats[4].base_stat}`;

    pokemonPlayer = pokemon;

    msg.innerHTML = `Você jogou ${nomeM}`
}

async function mostrarPokemonEnimy() {
    let nomeM = pokemonEnimy.name[0].toUpperCase() + pokemonEnimy.name.substring(1)
    fundoPorTipo(pokemonEnimy.types[0].type.name)
    cartaEnimy.style.background = corFundo
    cartaEnimy.style.color = corLetra
    cartaEnimyNome.innerHTML = nomeM;
    cartaEnimyId.innerHTML = pokemonEnimy.id;
    cartaEnimyImg.src = pokemonEnimy.sprites.other['official-artwork'].front_default;
    cartaEnimyImg.style.background = corFundoImg
    cartaEnimyAtaq.innerHTML = `Ataq: ${pokemonEnimy.stats[1].base_stat}`;
    cartaEnimyDef.innerHTML = `Def: ${pokemonEnimy.stats[2].base_stat}`;
    cartaEnimyAtaqEsp.innerHTML = `Ataq Esp: ${pokemonEnimy.stats[3].base_stat}`;
    cartaEnimyDefEsp.innerHTML = `Def Esp: ${pokemonEnimy.stats[4].base_stat}`;

    msg.innerHTML = `Enimy jogou ${nomeM}`

}

function fundoPorTipo(tipo) {
    let corPorTipo = tipo
    if (corPorTipo == 'grass') {
        corFundo = cores.grass
        corLetra = cores.white
    } else if (corPorTipo == 'poison') {
        corFundo = cores.poison
        corLetra = cores.white
    } else if (corPorTipo == 'fire') {
        corFundo = cores.fire
        corLetra = cores.white
    } else if (corPorTipo == 'flying') {
        corFundo = cores.flying
        corLetra = cores.black
    } else if (corPorTipo == 'water') {
        corFundo = cores.water
        corLetra = cores.white
    } else if (corPorTipo == 'bug') {
        corFundo = cores.bug
        corLetra = cores.white
    } else if (corPorTipo == 'normal') {
        corFundo = cores.normal
        corLetra = cores.black
    } else if (corPorTipo == 'electric') {
        corFundo = cores.electric
        corLetra = cores.black
    } else if (corPorTipo == 'ground') {
        corFundo = cores.ground
        corLetra = cores.white
    } else if (corPorTipo == 'fairy') {
        corFundo = cores.fairy
        corLetra = cores.black
    } else if (corPorTipo == 'fighting') {
        corFundo = cores.figthing
        corLetra = cores.white
    } else if (corPorTipo == 'psychic') {
        corFundo = cores.psychic
        corLetra = cores.black
    } else if (corPorTipo == 'rock') {
        corFundo = cores.rock
        corLetra = cores.white
    } else if (corPorTipo == 'steel') {
        corFundo = cores.steel
        corLetra = cores.white
    } else if (corPorTipo == 'ice') {
        corFundo = cores.ice
        corLetra = cores.black
    } else if (corPorTipo == 'ghost') {
        corFundo = cores.ghost
        corLetra = cores.white
    } else if (corPorTipo == 'dragon') {
        corFundo = cores.dragon
        corLetra = cores.white
    } else if (corPorTipo == 'dark') {
        corFundo = cores.dark
        corLetra = cores.white
    }

}

function compararAtributo(n1, n2) {
     
        if (n1 > n2) {
            msg.innerHTML = 'Você ganhou essa rodada'
            cartaEnimy.style.opacity = '0.3'
            pontoPlayer++
            pokemonsPlayer.push({ nome: pokemonPlayer.name, img: pokemonPlayer.sprites.other['official-artwork'].front_default, perdeu: false })
            console.log(pokemonsPlayer);
        } else if (n1 == n2) {
            msg.innerHTML = 'Essa rodada empatou'
        } else if (n1 < n2) {
            msg.innerHTML = 'Você perdeu essa rodada'
            cartaPlayer.style.opacity = '0.3'
            pontoEnimy++
            pokemonsPlayer.push({ nome: pokemonPlayer.name, img: pokemonPlayer.sprites.other['official-artwork'].front_default, perdeu: true })
            console.log(pokemonsPlayer);
        }
        
        if (rodada == 10) {
            if (pontoPlayer > pontoEnimy) {
                msgFinal.innerHTML = 'Parabéns você ganhou!'
            } else if (pontoPlayer == pontoEnimy) {
                msgFinal.innerHTML = 'Empate!'
            } else if (pontoPlayer < pontoEnimy) {
                msgFinal.innerHTML = 'Que pena você perdeu!'
            }
            telaFinal.style.display = 'flex'
            mostrarListaPokemon()
            
        }

    msgRodada.innerHTML = `Rodada: ${rodada}`;
    placarPlayer.innerHTML = `${nomeDoPlayer}: ${pontoPlayer}`
    placarEnimy.innerHTML = `${nomeDoEnimy}: ${pontoEnimy}`
}

function vitoriaOuDerrota() {
}

function resetCartaPlayer() {
    cartaPlayer.style.background = 'none'
    cartaPlayer.style.color = 'black'
    cartaPlayerNome.innerHTML = 'Nome:';
    cartaPlayerId.innerHTML = 'Id: 0';
    cartaPlayerImg.src = '';
    cartaPlayerImg.style.background = 'none'
    cartaPlayerAtaq.innerHTML = `Ataq: 0`;
    cartaPlayerDef.innerHTML = `Def: 0`;
    cartaPlayerAtaqEsp.innerHTML = `Ataq Esp: 0`;
    cartaPlayerDefEsp.innerHTML = `Def Esp: 0`;
}

function resetarCarta() {
    cartaEnimy.style.opacity = 1
    cartaPlayer.style.opacity = 1

    cartaEnimy.style.background = 'none'
    cartaEnimy.style.color = 'black'
    cartaEnimyNome.innerHTML = 'Nome: 0';
    cartaEnimyId.innerHTML = 'Id: 0 ';
    cartaEnimyImg.src = '';
    cartaEnimyImg.style.background = 'none'
    cartaEnimyAtaq.innerHTML = `Ataq: 0 `;
    cartaEnimyDef.innerHTML = `Def: `;
    cartaEnimyAtaqEsp.innerHTML = `Ataq Esp: 0`;
    cartaEnimyDefEsp.innerHTML = `Def Esp: 0`;
}

//FUNÇOES----------------------------------------------------------

//PLACAR ---------------------------------------------------------

const msgRodada = document.querySelector('#rodada');
const placarPlayer = document.querySelector('.placar-player');
const placarEnimy = document.querySelector('.placar-enimy');

var rodada = 0;
var pontoPlayer = 0;
var pontoEnimy = 0;

msgRodada.innerHTML = `Rodada: ${rodada}`;


//PLACAR ----------------------------------------------------------

//CARTA PLAYER-------------------------------------------------------

const cartaPlayer = document.querySelector('#carta-player')
const cartaPlayerNome = document.querySelector('#nome-pokemon-player');
const cartaPlayerId = document.querySelector('#id-pokemon-player');
const cartaPlayerImg = document.querySelector('#img-pokemon-player');
const cartaPlayerAtaq = document.querySelector('#ataq-pokemon-player');
const cartaPlayerDef = document.querySelector('#def-pokemon-player');
const cartaPlayerAtaqEsp = document.querySelector('#ataq-esp-pokemon-player');
const cartaPlayerDefEsp = document.querySelector('#def-esp-pokemon-player');



//CARTA PLAYER-------------------------------------------------------


//CARTA ENIMY-------------------------------------------------------

const cartaEnimy = document.querySelector('#carta-enimy')
const cartaEnimyNome = document.querySelector('#nome-pokemon-enimy');
const cartaEnimyId = document.querySelector('#id-pokemon-enimy');
const cartaEnimyImg = document.querySelector('#img-pokemon-enimy');
const cartaEnimyAtaq = document.querySelector('#ataq-pokemon-enimy');
const cartaEnimyDef = document.querySelector('#def-pokemon-enimy');
const cartaEnimyAtaqEsp = document.querySelector('#ataq-esp-pokemon-enimy');
const cartaEnimyDefEsp = document.querySelector('#def-esp-pokemon-enimy');



//CARTA ENIMY-------------------------------------------------------

//RESET--------------------------------------------------------------

function reset() {
    resetCartaPlayer()
    resetarCarta()
    rodada = 0;
    pontoPlayer = 0;
    pontoEnimy = 0;
    pokemonsPlayer.splice(0)
    pokemonEnimy = ''
    pokemonPlayer = ''
    msg.innerHTML = ''
    msgRodada.innerHTML = `Rodada: ${rodada}`;
    placarPlayer.innerHTML = `${nomeDoPlayer}: ${pontoPlayer}`
    placarEnimy.innerHTML = `${nomeDoEnimy}: ${pontoEnimy}`
    listaTimePokemon.innerHTML = ''
}

//RESET -------------------------------------------------------------

//MENSAGENS---------------------------------------------------------

const msg = document.querySelector('.msg')

msg.innerHTML = ''

//MENSAGENS---------------------------------------------------------

//BOTÕES-----------------------------------------------------------

const btConprar = document.querySelector('#bt-compra')
const btAtaq = document.querySelector('#bt-ataq')
const btDef = document.querySelector('#bt-def')
const btAtaqEsp = document.querySelector('#bt-ataq-esp')
const btDefEsp = document.querySelector('#bt-def-esp')
const btComecar = document.querySelector('#start')
const btreset = document.querySelector('#jogar-novamente')

function ativarButtons() {
    btAtaq.disabled = false
    btAtaqEsp.disabled = false
    btDef.disabled = false
    btDefEsp.disabled = false
    btConprar.disabled = true
}

function desativarButtons() {
    btAtaq.disabled = true
    btAtaqEsp.disabled = true
    btDef.disabled = true
    btDefEsp.disabled = true
    btConprar.disabled = false
}

btConprar.addEventListener('click', () => {
    mostrarPokemonPlayer(randomPokemon())
    ativarButtons()
    resetarCarta()
    rodada++
    msgRodada.innerHTML = `Rodada: ${rodada}`;
})

btAtaq.addEventListener('click', () => {
    mostrarPokemonEnimy()
    desativarButtons()
    setTimeout(() => {
        compararAtributo(pokemonPlayer.stats[1].base_stat, pokemonEnimy.stats[1].base_stat)
    }, 1500);
})

btDef.addEventListener('click', () => {
    mostrarPokemonEnimy()
    desativarButtons()
    setTimeout(() => {
        compararAtributo(pokemonPlayer.stats[2].base_stat, pokemonEnimy.stats[2].base_stat)
    }, 1500);

})

btAtaqEsp.addEventListener('click', () => {
    mostrarPokemonEnimy()
    desativarButtons()
    setTimeout(() => {
        compararAtributo(pokemonPlayer.stats[3].base_stat, pokemonEnimy.stats[3].base_stat)
    }, 1500);

})

btDefEsp.addEventListener('click', () => {
    mostrarPokemonEnimy()
    desativarButtons()
    setTimeout(() => {
        compararAtributo(pokemonPlayer.stats[4].base_stat, pokemonEnimy.stats[4].base_stat)
    }, 1500);
})

btComecar.addEventListener('click', () => {

    nomeDoPlayer = document.querySelector('#name-player').value
    nomeDoEnimy = document.querySelector('#name-enimy').value
    placarPlayer.innerHTML = `${nomeDoPlayer}: ${pontoPlayer}`
    placarEnimy.innerHTML = `${nomeDoEnimy}: ${pontoEnimy}`
    telaInicial.style.display = 'none'

})

btreset.addEventListener('click', () => {
    reset()
    telaFinal.style.display = 'none'

})


//BOTÕES-----------------------------------------------------------
