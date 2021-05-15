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
      <!-- <div class="sidebar"></div> -->
      <poke-filters title="Filtrar por tipo" :vmodel.sync="selectedTypes" />
      <poke-list class="list" />
    </div>
    <h1>{{ searchTerm }}</h1>
  </div>
</template>

<script lang="ts">
// import Logo from '~/components/Logo.vue'
import { Component, Vue } from 'vue-property-decorator'
import { PokeInput, PokeSelect } from '~/shared/components'
import { PokeFilters, PokeList } from '~/components/pokedex'

// des and asc
const options = [
  {
    sort_param: 'name',
    dir: 'asc',
    label: 'Por Nome A-Z',
  },
  {
    sort_param: 'name',
    dir: 'des',
    label: 'Por Nome Z-A',
  },
  {
    sort_param: 'register',
    dir: 'asc',
    label: 'Menor numero primeiro',
  },
  {
    sort_param: 'register',
    dir: 'des',
    label: 'Maior numero primeiro',
  },
]

const pokemonTypes: any = []

@Component({
  async asyncData(context) {
    const data = await context.$axios.$get(
      `https://unpkg.com/pokemons@1.1.0/pokemons.json`
    )

    const { results } = data

    return { results }
  },
  components: { PokeInput, PokeSelect, PokeFilters, PokeList },
  data() {
    return {
      options,
      pokemonTypes,
    }
  },
})
class Index extends Vue {
  selectedTypes = []
  searchTerm = ''
  selectedOrder = options[3]
}

export default Index
</script>

<style lang="scss" scoped>
@import '~/assets/scss/settings/measures.scss';

.container {
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
}
</style>
