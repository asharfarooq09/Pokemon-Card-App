import React from "react";
import { Pokemon } from "../services/PokemonService";
import { getTypeColor } from "../utils/typeColors";

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: (pokemon: Pokemon) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
  const primaryTypeColor =
    pokemon.types.length > 0 ? getTypeColor(pokemon.types[0]) : "#777777";

  return (
    <div
      className="pokemon-card group cursor-pointer hover:scale-105"
      onClick={() => onClick(pokemon)}
      tabIndex={0}
      role="button"
      aria-pressed="false"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick(pokemon);
        }
      }}
    >
      <div
        className="pokemon-card-header"
        style={{ backgroundColor: primaryTypeColor }}
      >
        <h3 className="capitalize text-lg">{pokemon.name}</h3>
        <span className="text-white opacity-80">
          #{pokemon.id.toString().padStart(3, "0")}
        </span>
      </div>

      <div className="pokemon-card-img-container group-hover:bg-gray-50 transition-colors">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="h-32 w-32 object-contain transition-all duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      <div className="pokemon-card-info">
        <div className="mb-3">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className="type-badge capitalize"
              style={{ backgroundColor: getTypeColor(type) }}
            >
              {type}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex flex-col">
            <span className="text-gray-500">Height</span>
            <span className="font-medium">{pokemon.height} m</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">Weight</span>
            <span className="font-medium">{pokemon.weight} kg</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
