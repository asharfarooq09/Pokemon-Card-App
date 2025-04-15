import React from "react";
import PokemonExplorer from "../components/PokemonExplorer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-pokemon-blue text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Pokédex</h1>
        </div>
      </header>

      <main>
        <PokemonExplorer />
      </main>

      <footer className="py-6 text-center text-gray-500 text-sm border-t border-gray-200 mt-12">
        <p>
          Powered by{" "}
          <a
            href="https://pokeapi.co"
            className="text-pokemon-blue hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            PokéAPI
          </a>
        </p>
        <p className="mt-1">
          © {new Date().getFullYear()} Pokémon Card Explorer. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
