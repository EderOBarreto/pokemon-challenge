export interface IPokemon {
  attack: number
  defense: number
  evolution: {
    name: string
  } | null
  hp: number
  name: string
  national_number: string
  sp_atk: number
  sp_def: number
  speed: number
  sprites: {
    animated?: ''
    large?: ''
    normal?: ''
  }
  total: number
  type: Array<string>
}
