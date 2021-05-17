<template>
  <div class="container">
    <div class="search">
      <poke-input
        placeholder="Pesquisar por nome ou numero"
        width="500"
        :vmodel.sync="searchTerm"
      />
      <div class="select">
        <span class="text">Ordenar Por</span>
        <poke-select :options="options" :vmodel.sync="selectedOrder" />
      </div>
    </div>
    <div class="pokemons">
      <div class="filters">
        <poke-filters title="Filtrar por Tipo" :vmodel.sync="selectedTypes" />
        <h3 class="title">Filtrar Favoritos</h3>
        <poke-switch :vmodel.sync="isFilteredByFavorites" />
      </div>
      <poke-list class="list" :pokemons="getPokemons()" />
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable camelcase */
import { Component, Vue } from 'vue-property-decorator'
import { uniqBy, orderBy } from 'lodash'
import { getModule } from 'vuex-module-decorators'
import Favorites from '~/store/favorites'
import { PokeInput, PokeSelect, PokeSwitch } from '~/shared/components'
import { PokeFilters, PokeList } from '~/components/pokedex'
import { ISortOption } from '~/types/ISortOption'
import { IPokemon } from '~/types/IPokemon'

const options: Array<ISortOption> = [
  {
    sortParam: 'name',
    dir: 'asc',
    label: 'Por Nome A-Z',
  },
  {
    sortParam: 'name',
    dir: 'desc',
    label: 'Por Nome Z-A',
  },
  {
    sortParam: 'national_number',
    dir: 'asc',
    label: 'Menor numero primeiro',
  },
  {
    sortParam: 'national_number',
    dir: 'desc',
    label: 'Maior numero primeiro',
  },
]

const API = `https://unpkg.com/pokemons@1.1.0/pokemons.json`

@Component({
  head: {
    title: 'Pokedex',
  },
  async asyncData(context) {
    const data = await context.$axios.$get(API)

    const results = uniqBy(data.results, 'national_number')

    return { results }
  },
  components: { PokeInput, PokeSelect, PokeFilters, PokeList, PokeSwitch },
  data() {
    return {
      options,
    }
  },
})
class Index extends Vue {
  selectedTypes: Array<string> = []
  searchTerm = ''
  selectedOrder: ISortOption = options[2]
  isFilteredByFavorites = false

  calInstance = getModule(Favorites, this.$store)

  getPokemonsSearched(pokemons: Array<IPokemon>) {
    let filteredResult = pokemons
    const nameOrNumberRegex = RegExp(`${this.searchTerm.trim()}`, 'ig')
    filteredResult = filteredResult.filter(({ national_number, name }: any) => {
      return (
        nameOrNumberRegex.test(name) || nameOrNumberRegex.test(national_number)
      )
    })
    return filteredResult
  }

  getSortedPokemons(pokemons: Array<IPokemon>) {
    const { sortParam, dir } = this.selectedOrder
    return orderBy(pokemons, sortParam, dir)
  }

  /**
   * Will select if the pokemon has at least one of the types
   */
  getFilterByType(pokemons: Array<IPokemon>): IPokemon[] {
    if (this.selectedTypes.length > 0) {
      const filtered = pokemons.filter((pokemon) =>
        pokemon.type.some((type) =>
          this.selectedTypes.includes(type.toLowerCase())
        )
      )
      return filtered
    }

    return pokemons
  }

  getFavoritePokemons(pokemons: Array<IPokemon>) {
    if (this.isFilteredByFavorites) {
      return pokemons.filter(({ national_number }) => {
        return this.calInstance.favorites.includes(national_number)
      })
    }
    return pokemons
  }

  // TODO: maybe manage that in a better place
  getPokemons() {
    const pokemons = this.$data.results
    const favoritedPokemons = this.getFavoritePokemons(pokemons)
    const pokemonsSearched = this.getPokemonsSearched(favoritedPokemons)
    const sortedPokemons = this.getSortedPokemons(pokemonsSearched)
    const filteredPokemons = this.getFilterByType(sortedPokemons)
    return filteredPokemons
  }
}

export default Index
</script>

<style lang="scss" scoped>
@import '~/assets/scss/settings/measures.scss';

.container {
  max-width: 1200px; // TODO: use breakpoints later
  width: 100%;
  margin: 0 20px;
  display: grid;
}

.search {
  display: grid;
  grid-template-columns: repeat(2, auto);
  margin-top: 40px;
  width: 100%;
}

.search > .select {
  display: flex;
  z-index: 1;
  align-items: center;
  justify-self: end;
}

.container > .pokemons {
  display: grid;
  grid-template-columns: 200px 1fr;
  margin-top: 60px;
}

.search > .select > .text {
  font-size: 14px;
  margin-right: 15px;
}

.container > .pokemons > .filters > .title {
  font-weight: 600;
  font-size: 16px;
}
</style>
