import { useEffect, useState } from 'react';
import './App.css';
import Game from './Game';

function App() {

  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const promises = [];
      for (let i = 0; i < 6; i++) {
        promises.push(fetch('https://pokeapi.co/api/v2/pokemon/' + Math.floor(Math.random() * 151)).then(res => res.json()));
      }
      const data = await Promise.all(promises);
      const pokemonObjects = data.map(pokemon => ({ src: pokemon.sprites.front_default, matched: false }));
      setPokemons(pokemonObjects);
    }
    fetchPokemons();
  }, []);

  return (
    <div className="App">
      <Game cardImages={pokemons}/>
    </div>
  );
}

export default App;
