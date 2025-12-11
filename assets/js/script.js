const nomePokemon = document.querySelector('.nome-pokemon');
const numeroPokemon = document.querySelector('.numero-pokemon');
const imagemPokemon =  document.querySelector('.img-pokemon');

const form = document.querySelector('.form');
const input = document.querySelector('.pesquisa');

const botaoPrev = document.querySelector('.btn-prev');
const botaoNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status === 200) {
        const data = await APIResponse.json();

        return data;
    }

    
}

const renderPokemon = async (pokemon) => {
    nomePokemon.innerHTML = 'Carregando...';

    const data = await fetchPokemon(pokemon);

    if(data){
    imagemPokemon.style.display = 'block';
    nomePokemon.innerHTML = data.name;
    numeroPokemon.innerHTML = data.id;
    imagemPokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

    input.value = '';
    searchPokemon = data.id;
    } else {
        imagemPokemon.style.display = 'none';
        nomePokemon.innerHTML = 'Não encontrado :c';
        numeroPokemon.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
})

botaoPrev.addEventListener('click', () => {
    if(searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
})

botaoNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
})

renderPokemon(searchPokemon);