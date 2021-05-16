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
      <div>
        <poke-filters title="Filtrar por Tipo" :vmodel.sync="selectedTypes" />
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
import { PokeInput, PokeSelect } from '~/shared/components'
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

@Component({
  head: {
    title: 'Pokedex',
  },
  async asyncData(context) {
    const data = await context.$axios.$get(
      `https://unpkg.com/pokemons@1.1.0/pokemons.json`
    )

    const results = uniqBy(data.results, 'national_number')

    return { results }
  },
  components: { PokeInput, PokeSelect, PokeFilters, PokeList },
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

  calInstance = getModule(Favorites, this.$store)

  getPokemonsSearched() {
    let filteredResult = [...this.$data.results] as any
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
   *
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

  getPokemons() {
    const pokemonsSearched = this.getPokemonsSearched()
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
  width: 1200px; // TODO: use breakpoints later
  margin: 0 auto;
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

.search > .select > .text {
  font-size: 14px;
  margin-right: 15px;
}

.container > .pokemons {
  display: grid;
  grid-template-columns: 200px 1fr;
  margin-top: 60px;
}
</style>
