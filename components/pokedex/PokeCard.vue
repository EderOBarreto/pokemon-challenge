<template>
  <div class="poke-card">
    <img class="image" :src="data.sprites.large" />
    <span class="number"> N°{{ data.national_number }} </span>
    <strong class="name">{{ data.name }}</strong>
    <div class="types"></div>
  </div>
</template>
<script lang="ts">
/* eslint-disable camelcase */
import { Vue, Prop, Component } from 'vue-property-decorator'
import { IPokemon } from '~/types/IPokemon'

@Component
class PokeCard extends Vue {
  @Prop({ default: {} }) data!: IPokemon
}
export default PokeCard
</script>

<style lang="scss" scoped>
@import '~/assets/scss/settings/colors.scss';
.poke-card {
  display: grid;
  width: 200px;
  height: 250px;
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
  background-color: $light-gray;
  justify-self: center;
  width: 150px;
  height: 150px;
  object-position: center;
  object-fit: fill;
}
</style>
