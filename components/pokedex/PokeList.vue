<template>
  <div class="poke-list">
    <template v-if="getPokemons.length > 0">
      <transition-group name="card" class="list" tag="div">
        <poke-card
          v-for="pokemon of getPokemons"
          :key="pokemon.national_number"
          class="card"
          :data="pokemon"
        />
      </transition-group>
    </template>
    <p class="empty" v-else>Nenhum pokemon foi encontrado!</p>
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
@import '~/assets/scss/settings/measures.scss';

.poke-list {
  height: calc(100vh - 260px);
  overflow-y: auto;
  @include scrollbars(5px, $red, $white);
}

.poke-list > .list {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(200px, 1fr)
  ); // TODO: consider cardweigth later
  gap: 25px;
  padding-top: 25px;
  padding-left: 5px;
  padding-right: 5px;
  // TODO: consider cardheigth later
}

.poke-list > .empty {
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: 0;
}

.poke-list > .list:after {
  content: '';
  height: 25px;
  grid-column: 1/-1;
}

.poke-list > .list > .card {
  transition: all ease 0.4s;
}

.poke-list > .list {
  .card-enter,
  .card-leave-to {
    opacity: 0;
  }
}
</style>
