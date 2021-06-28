import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { StateType } from 'typesafe-actions';
import pokemonReducer from './pokemonReducer';

const reducers = combineReducers({
  pokemon: pokemonReducer,
});

const store = createStore(reducers, composeWithDevTools());

export type RootState = StateType<typeof reducers>;

export default store;
