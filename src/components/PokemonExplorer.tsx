import React, { useState, useEffect } from "react";
import PokemonService, {
  Pokemon,
  PokemonListResponse,
} from "../services/PokemonService";
import PokemonCard from "./PokemonCard";
import PokemonDetailModal from "./PokemonDetailModal";
import SearchBox from "./SearchBox";
import Pagination from "./Pagination";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

const ITEMS_PER_PAGE = 20;

const PokemonExplorer: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const loadPokemons = async (page: number) => {
    try {
      setLoading(true);
      setError(null);

      const offset = (page - 1) * ITEMS_PER_PAGE;
      const response: PokemonListResponse = await PokemonService.getPokemons(
        ITEMS_PER_PAGE,
        offset
      );

      setTotalCount(response.count);
      setTotalPages(Math.ceil(response.count / ITEMS_PER_PAGE));

      const pokemonDetails = await Promise.all(
        response.results.map((pokemon) =>
          PokemonService.getPokemonDetails(pokemon.name)
        )
      );

      setPokemons(pokemonDetails);
    } catch (err) {
      setError("Failed to load Pokémon data. Please try again.");
      console.error("Error loading pokemons:", err);
    } finally {
      setLoading(false);
    }
  };

  const searchAllPokemons = async (query: string) => {
    if (!query.trim()) {
      setIsSearching(false);
      loadPokemons(currentPage);
      return;
    }

    try {
      setLoading(true);
      setIsSearching(true);
      setError(null);

      const allPokemonResponse = await PokemonService.getAllPokemonNames();

      const filteredNames = allPokemonResponse.results.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );

      setTotalCount(filteredNames.length);
      setTotalPages(Math.ceil(filteredNames.length / ITEMS_PER_PAGE));

      const paginatedResults = filteredNames.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      );

      const searchResults = await Promise.all(
        paginatedResults.map((pokemon) =>
          PokemonService.getPokemonDetails(pokemon.name)
        )
      );

      setPokemons(searchResults);
    } catch (err) {
      setError("Failed to search Pokémon. Please try again.");
      console.error("Error searching pokemons:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      searchAllPokemons(searchQuery);
    } else {
      loadPokemons(currentPage);
    }
  }, [currentPage, searchQuery]);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); 
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRetry = () => {
    if (searchQuery) {
      searchAllPokemons(searchQuery);
    } else {
      loadPokemons(currentPage);
    }
  };

  const handleCardClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 text-pokemon-blue">
          Pokémon Explorer
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Explore the world of Pokémon with this interactive card collection.
          Search for your favorite Pokémon or browse through all {totalCount}
          entries!
        </p>
      </div>

      <SearchBox onSearch={handleSearch} />

      {error ? (
        <ErrorMessage message={error} onRetry={handleRetry} />
      ) : loading ? (
        <div className="flex justify-center my-12">
          <LoadingSpinner
            size="lg"
            message={
              searchQuery ? "Searching Pokémon..." : "Catching Pokémon..."
            }
          />
        </div>
      ) : pokemons.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            No Pokémon Found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or browse a different page.
          </p>
        </div>
      ) : (
        <>
          {searchQuery && (
            <div className="mb-4 text-center">
              <p className="text-gray-600">
                Found {totalCount} Pokémon matching "{searchQuery}"
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onClick={handleCardClick}
              />
            ))}
          </div>
        </>
      )}

      {!loading && !error && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <PokemonDetailModal
        pokemon={selectedPokemon}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default PokemonExplorer;
