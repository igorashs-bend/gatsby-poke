import { Pokemon } from 'types';
import { ActionType, createAction } from 'typesafe-actions';

export const pokemonAdded = createAction('pokemon/Added', (id: string) => id)();

export const pokemonRemoved = createAction(
  'pokemon/Removed',
  (id: string) => id,
)();

export const pokemonReset = createAction('pokemon/Reset')();

export const pokemonUploaded = createAction(
  'pokemon/Uploaded',
  (pokemonList: Pokemon[]) => pokemonList,
)();

export const actions = {
  pokemonAdded,
  pokemonRemoved,
  pokemonReset,
  pokemonUploaded,
};

export type PokemonAction = ActionType<typeof actions>;
