<template>
  <div class="poke-card">
    <poke-favorite
      :on-change="onSelectFavorite"
      :class="['favorite', isFavorite ? '-selected' : '']"
      :favorited="isFavorite"
    />
    <img class="image" :src="data.sprites.large" />
    <span class="number">N° {{ data.national_number }} </span>
    <strong class="name">{{ data.name }}</strong>
    <div class="types">
      <poke-tag v-for="type of data.type" :key="type" :pokemon-type="type" />
    </div>
  </div>
</template>
<script lang="ts">
/* eslint-disable camelcase */
import { Vue, Prop, Component, Watch } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import Favorites from '~/store/favorites'
import { PokeTag, PokeFavorite } from '~/shared/components'
import { IPokemon } from '~/types/IPokemon'

@Component({
  components: { PokeTag, PokeFavorite },
})
class PokeCard extends Vue {
  @Prop({ default: {} }) data!: IPokemon
  isFavorite = false
  calInstance = getModule(Favorites, this.$store)

  onSelectFavorite() {
    this.calInstance.saveFavorite(this.data.national_number)
  }

  // TODO: search for a better way do deal with store being restored
  @Watch('$store.restored')
  @Watch('calInstance.favorites')
  @Watch('data')
  setIsFavorite() {
    this.isFavorite = this.getIsFavorite()
  }

  getIsFavorite() {
    return this.calInstance.favorites.includes(this.data.national_number)
  }
}
export default PokeCard
</script>

<style lang="scss" scoped>
@import '~/assets/scss/settings/index.scss';

.poke-card {
  position: relative;
  display: grid;
  min-width: $card-min-width;
  max-width: $card-max-width;
  height: $card-height;
  box-shadow: 0 3px 5px rgba($black, 0.3);
  padding: 15px;
  border-radius: 5px;
}

.poke-card > .number {
  color: #bdbdbd;
  margin: 10px 0;
}

.poke-card > .name {
  color: #4f4f4f;
  font-size: 20px;
}

.poke-card > .image {
  justify-self: center;
  width: 150px;
  height: 150px;
  object-position: center;
  object-fit: contain;
  user-select: none;
}

.poke-card > .types {
  display: grid;
  grid-template-columns: repeat(auto-fill, 65px);
  gap: 10px;
  padding: 10px 0;
}

.poke-card:hover > .favorite {
  display: block;
}

.poke-card > .favorite {
  display: none; // If favorite show aways
  position: absolute;
  right: 10px;
  top: 10px;

  &.-selected {
    display: block;
  }
}
</style>
