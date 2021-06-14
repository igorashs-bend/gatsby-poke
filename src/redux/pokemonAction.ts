import { Pokemon } from 'types';
import { ActionType, createAction } from 'typesafe-actions';
// do u really need this wtf? getType ? wtf? really? or ?
import {
  POKEMON_ADDED,
  POKEMON_REMOVED,
  POKEMON_RESET,
  POKEMON_UPLOADED,
} from './CONSTS';

export const pokemonAdded = createAction(POKEMON_ADDED, (id: string) => id)();

export const pokemonRemoved = createAction(
  POKEMON_REMOVED,
  (id: string) => id,
)();

export const pokemonReset = createAction(POKEMON_RESET)();

export const pokemonUploaded = createAction(
  POKEMON_UPLOADED,
  (pokemonList: Pokemon[]) => pokemonList,
)();

export const actions = {
  pokemonAdded,
  pokemonRemoved,
  pokemonReset,
  pokemonUploaded,
};

export type PokemonAction = ActionType<typeof actions>;
