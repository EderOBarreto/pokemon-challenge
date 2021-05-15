<template>
  <div class="poke-list"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

// TODO: Create component formula
@Component
class PokeList extends Vue {
  @Prop({ default: [] }) pokemons!: Array<any>
}
export default PokeList
</script>

<style lang="scss" scoped></style>
