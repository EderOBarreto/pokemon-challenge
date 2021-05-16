<template>
  <div class="pokemon-content">
    <header>
      <poke-header />
    </header>
    <div class="content">
      <nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PokeHeader from '~/components/layout/Header.vue'
@Component({
  components: { PokeHeader },
})
class Default extends Vue {}
export default Default
</script>

<style lang="scss" scoped>
@import '~/assets/scss/settings/measures.scss';
.pokemon-content {
  > .content {
    display: flex;
    justify-content: center;
    margin-top: $header-height;
    min-height: calc(100vh - #{$header-height});
  }
}
</style>
