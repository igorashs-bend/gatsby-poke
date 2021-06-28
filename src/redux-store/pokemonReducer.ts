import { Pokemon } from 'types';
import { getType } from 'typesafe-actions';
import {
  PokemonAction,
  pokemonAdded,
  pokemonRemoved,
  pokemonReset,
  pokemonUploaded,
} from './pokemonAction';
import { RootState } from './store';

export interface PokemonState {
  list: Pokemon[];
  selectedList: Pokemon[];
}

const initialState: PokemonState = {
  list: [],
  selectedList: [],
};

const pokemonReducer = (state = initialState, action: PokemonAction) => {
  switch (action.type) {
    case getType(pokemonAdded): {
      console.log('added', action.payload);

      if (state.selectedList.find((p) => p.id === action.payload)) return state;

      const poke = state.list.find((p) => p.id === action.payload);

      if (!poke) return state;

      const selectedPoke = { ...poke };

      return {
        ...state,
        selectedList: [...state.selectedList, selectedPoke],
      };
    }

    case getType(pokemonRemoved): {
      console.log('removed');

      const poke = state.list.find((p) => p.id === action.payload);

      if (!poke) return state;

      const selectedList = state.selectedList.filter(
        (p) => p.id !== action.payload,
      );

      return {
        ...state,
        selectedList,
      };
    }

    case getType(pokemonReset): {
      console.log('reset');

      const selectedList: Pokemon[] = [];

      return {
        ...state,
        selectedList,
      };
    }

    case getType(pokemonUploaded): {
      console.log('uploaded');

      const newState: PokemonState = {
        list: action.payload,
        selectedList: [],
      };

      return newState;
    }

    default:
      return state;
  }
};

export const selectPokemonList = ({ pokemon }: RootState) => pokemon.list;
export const selectPokemonSelectedList = ({ pokemon }: RootState) =>
  pokemon.selectedList;

export default pokemonReducer;
