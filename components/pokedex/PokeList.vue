<template>
  <div class="poke-list">
    <poke-card
      v-for="(pokemon, index) of getPokemons"
      :key="index"
      class="card"
      :data="pokemon"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import PokeCard from './PokeCard.vue'
import { IPokemon } from '~/types/IPokemon'

// TODO: Create component formula

@Component({
  components: { PokeCard },
})
class PokeList extends Vue {
  @Prop({ default: [] }) pokemons!: Array<IPokemon>

  get getPokemons() {
    return this.pokemons
  }
}
export default PokeList
</script>

<style lang="scss" scoped>
@import '~/assets/scss/tools/scrollbars.scss';
@import '~/assets/scss/settings/colors.scss';

.poke-list {
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(200px, 1fr)
  ); // TODO: consider cardweigth later
  gap: 25px;
  padding-top: 25px;
  padding-left: 5px;
  height: calc(100vh - 300px); // TODO: consider cardheigth later
  @include scrollbars(5px, $red, $white);
}

.poke-list:after {
  content: '';
  height: 25px;
  grid-column: 1/-1;
}
</style>
