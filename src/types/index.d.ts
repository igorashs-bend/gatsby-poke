declare module '*.png';

export interface Pokemon {
  name: string;
  id: string;
  national_number: string;
  sp_atk: number;
  sp_def: number;
  speed: number;
  attack: number;
  hp: number;
  defense: number;
  sprites: {
    normal: string;
  };
}
