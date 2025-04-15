import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pokemon } from "../services/PokemonService";
import { getTypeColor } from "../utils/typeColors";
import { Badge } from "@/components/ui/badge";
import { Dna, Weight, Ruler, Swords, Shield } from "lucide-react";

interface PokemonDetailModalProps {
  pokemon: Pokemon | null;
  isOpen: boolean;
  onClose: () => void;
}

const PokemonDetailModal: React.FC<PokemonDetailModalProps> = ({
  pokemon,
  isOpen,
  onClose,
}) => {
  if (!pokemon) return null;

  const primaryTypeColor =
    pokemon.types.length > 0 ? getTypeColor(pokemon.types[0]) : "#777777";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-2xl capitalize">{pokemon.name}</span>
            <span className="text-lg text-gray-500">
              #{pokemon.id.toString().padStart(3, "0")}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg">
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="h-48 w-48 object-contain animate-float"
            />
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Types</h3>
              <div className="flex flex-wrap gap-2">
                {pokemon.types.map((type) => (
                  <Badge
                    key={type}
                    className="capitalize text-white"
                    style={{ backgroundColor: getTypeColor(type) }}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Ruler className="text-gray-400" size={18} />
                <div>
                  <p className="text-sm text-gray-500">Height</p>
                  <p className="font-medium">{pokemon.height} m</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Weight className="text-gray-400" size={18} />
                <div>
                  <p className="text-sm text-gray-500">Weight</p>
                  <p className="font-medium">{pokemon.weight} kg</p>
                </div>
              </div>
            </div>

            {pokemon.stats && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Base Stats
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Swords size={16} className="text-pokemon-red" />
                    <span className="text-gray-600">Attack: </span>
                    <span className="font-medium">
                      {pokemon.stats.find((stat) => stat.name === "attack")
                        ?.value || "?"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-pokemon-blue" />
                    <span className="text-gray-600">Defense: </span>
                    <span className="font-medium">
                      {pokemon.stats.find((stat) => stat.name === "defense")
                        ?.value || "?"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {pokemon.abilities && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Abilities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability) => (
                    <Badge
                      key={ability}
                      variant="outline"
                      className="capitalize"
                    >
                      {ability}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div
              className="h-1 rounded-full mt-3"
              style={{ backgroundColor: primaryTypeColor }}
            ></div>

            <div className="flex items-center gap-2">
              <Dna size={16} className="text-gray-400" />
              <span className="text-sm text-gray-500">
                Species:{" "}
                <span className="capitalize font-medium">
                  {pokemon.species || pokemon.name}
                </span>
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PokemonDetailModal;
