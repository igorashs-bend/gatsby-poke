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
      const poke = state.list.find((p) => p.id === action.payload);

      if (poke)
        return { ...state, selectedList: [...state.selectedList, poke] };

      return state;
    }

    case getType(pokemonRemoved):
      console.log('removed');

      return state;

    case getType(pokemonReset):
      console.log('reset');

      return state;

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
