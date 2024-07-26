import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './components/Card';
import { v4 as uuidv4 } from 'uuid';

function App() {
  // Setting state for getting data
  const [data, setData] = useState([]); // Initialize with an empty array

  // Using useEffect so that data is fetched automatically when the page is loaded.
  useEffect(() => {
    const fetchPoke = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const pokemonData = await Promise.all(
          response.data.results.map(async (item) => {
            const pokemonDetail = await axios.get(item.url);
            return {
              id: uuidv4(),
              name: item.name,
              url: item.url,
              image: pokemonDetail.data.sprites.front_default, // Fetching the image URL
              abilities: pokemonDetail.data.abilities.map((ability) => ability.ability.name), // Fetching abilities
            };
          })
        );
        setData(pokemonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPoke();
  }, []);

  return (
    <>
      {data.length > 0 ? <Card data={data} /> : <p>Loading...</p>} 
    </>
  );
}

export default App;
