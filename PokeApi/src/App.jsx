import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import PokemonGrid from "./components/PokemonGrid";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");

  return (
    <>
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      <PokemonGrid searchQuery={searchQuery} selectedType={selectedType} />
    </>
  );
}

export default App;
