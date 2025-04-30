import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTimes, FaEye } from "react-icons/fa";
import "../index.css";

const PokemonGrid = ({ searchQuery = "", selectedType = "" }) => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        const data = await response.json();

        const detailedData = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return await res.json();
          })
        );

        setPokemons(detailedData);
      } catch (err) {
        setError("Failed to fetch Pokémon data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter((poke) => {
    const matchesSearch = poke.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      !selectedType || poke.types.some((t) => t.type.name === selectedType.toLowerCase());
    return matchesSearch && matchesType;
  });

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <div className="loader" />
      </div>
    );

  if (error)
    return <p className="text-center text-red-500 py-8">{error}</p>;

  return (
    <>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPokemons.map((poke) => (
          <motion.div
            key={poke.id}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl shadow-lg bg-gradient-to-br from-white/60 via-purple-100 to-indigo-100 backdrop-blur-md border border-purple-200 transition"
          >
            <div className="flex justify-center mt-4">
              <div className="bg-gradient-to-r from-purple-300 to-indigo-300 w-25 h-30 rounded-full flex items-center justify-center shadow-inner">
                <img
                  src={poke.sprites.front_default}
                  alt={poke.name}
                  className="w-24 h-24 object-contain"
                />
              </div>
            </div>

            <div className="p-4 text-center">
              <h3 className="text-lg font-bold capitalize text-gray-800">{poke.name}</h3>
              <p className="text-sm text-gray-600 mb-2 flex gap-4">
                <span>ID: {poke.id}</span>
                <span>Type: {poke.types.map((t) => t.type.name).join(", ")}</span>
              </p>
              <div className="flex justify-start">
                <button
                  onClick={() => setSelectedPokemon(poke)}
                  className="text-indigo-600 hover:text-indigo-800 transition text-xl"
                  title="View Details"
                >
                  <FaEye />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedPokemon && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-lg w-[95%] max-w-md p-6 relative"
          >
            <button
              onClick={() => setSelectedPokemon(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
            >
              <FaTimes />
            </button>

            <div className="flex flex-col items-center gap-2 font-inter">
              <img
                src={selectedPokemon.sprites.other["official-artwork"].front_default}
                alt={selectedPokemon.name}
                className="w-40 h-40 object-contain"
              />
              <h2 className="text-2xl font-bold capitalize text-gray-800">
                {selectedPokemon.name}
              </h2>
              <div className="w-full mt-4 px-4 py-3 rounded-lg shadow-inner 
                  bg-gradient-to-br from-purple-100 via-white to-indigo-100 
                  grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800">
                <div>
                  <p className="font-semibold">ID</p>
                  <p>{selectedPokemon.id}</p>
                </div>
                <div>
                  <p className="font-semibold">Type</p>
                  <p className="capitalize">
                    {selectedPokemon.types.map((t) => t.type.name).join(", ")}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Height</p>
                  <p>{selectedPokemon.height}</p>
                </div>
                <div>
                  <p className="font-semibold">Weight</p>
                  <p>{selectedPokemon.weight}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="font-semibold">Base Experience</p>
                  <p>{selectedPokemon.base_experience}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default PokemonGrid;
