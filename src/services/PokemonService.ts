
// Types
export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonStat {
  name: string;
  value: number;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: string[];
  image: string;
  species?: string;
  abilities?: string[];
  stats?: PokemonStat[];
}

interface ApiType {
  type: {
    name: string;
  };
}

interface ApiAbility {
  ability: {
    name: string;
  };
}

interface ApiStat {
  base_stat: number;
  stat: {
    name: string;
  };
}


const API_BASE_URL = 'https://pokeapi.co/api/v2';

const PokemonService = {
  getPokemons: async (limit: number = 20, offset: number = 0): Promise<PokemonListResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);

      if (!response.ok) {
        throw new Error('Failed to fetch Pokemons');
      }

      return await response.json();
    } catch (error) {
      console.error('Error in getPokemons:', error);
      throw error;
    }
  },

  getAllPokemonNames: async (limit: number = 1300): Promise<PokemonListResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/pokemon?limit=${limit}&offset=0`);

      if (!response.ok) {
        throw new Error('Failed to fetch Pokemon names');
      }

      return await response.json();
    } catch (error) {
      console.error('Error in getAllPokemonNames:', error);
      throw error;
    }
  },

  getPokemonDetails: async (nameOrId: string | number): Promise<Pokemon> => {
    try {
      const response = await fetch(`${API_BASE_URL}/pokemon/${nameOrId}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch details for Pokemon: ${nameOrId}`);
      }

      const data = await response.json();

      const pokemon: Pokemon = {
        id: data.id,
        name: data.name,
        height: data.height / 10,
        weight: data.weight / 10,
        types: data.types.map((type: ApiType) => type.type.name),
        image:
          data.sprites?.other?.['official-artwork']?.front_default ||
          data.sprites?.front_default,
        species: data.species?.name,
        abilities: data.abilities?.map((ability: ApiAbility) => ability.ability.name),
        stats: data.stats?.map((stat: ApiStat) => ({
          name: stat.stat.name,
          value: stat.base_stat,
        })),
      };


      return pokemon;
    } catch (error) {
      console.error('Error in getPokemonDetails:', error);
      throw error;
    }
  }
};

export default PokemonService;
