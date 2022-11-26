export type Pokemon = {
   name: string
   url: string
 }

export interface PokemonApiResponse {
   count: number
   next: string | null
   previous: string | null
   results: Pokemon[]
 }

 export enum KeyNameCodes {
  ArrowDown = 'ArrowDown',
  ArrowUp = 'ArrowUp',
  Enter = 'Enter',
  Escape = 'Escape',
};
