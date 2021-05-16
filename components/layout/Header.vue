<template>
  <nav class="poke-header">
    <ul class="options">
      <li class="brand">
        <nuxt-link class="link" to="/">
          <img src="@/assets/icons/pokeball.svg" alt="Pokemon" class="icon" />
          <span class="title">Pokédex</span>
        </nuxt-link>
      </li>
      <li class="option user">
        <nuxt-link class="link" to="/">
          <img src="@/assets/icons/synvia-A.svg" alt="User" class="icon" />
        </nuxt-link>
      </li>
      <li class="option sign-out">
        <nuxt-link class="link" to="/">
          <font-awesome-icon far icon="sign-out-alt" class="icon" />
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
class PokHeader extends Vue {}
export default PokHeader
</script>

<style lang="scss" scoped>
@import '~/assets/scss/settings/measures.scss';
@import '~/assets/scss/settings/colors.scss';

.poke-header {
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
  justify-items: center;
  width: 100vw;
  height: $header-height;
  padding: 0;
  margin: 0;
  background-color: $red;
  z-index: 5;
  box-shadow: 0 3px 5px rgba($black, 0.3);
}

.poke-header > .options {
  max-width: 1200px; // TODO: add breakpoints afterwards
  width: 100%;
  display: grid;
  grid-template-columns: 1fr repeat(2, 50px);
  align-items: center;
}

.poke-header > .options > .brand {
  display: flex;
}

.poke-header > .option {
  justify-self: center;
}

.poke-header > .options > .option > .link > .icon {
  font-size: 24px;
  color: $white;
}

.poke-header > .options > .brand > .link {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 25px;
  text-decoration: none;
}

.poke-header > .options > .brand > .link > .title {
  color: $white;
  font-weight: 700;
  font-size: 32px;
}

.poke-header > .options > .brand > .link > .icon {
  height: 55px;
  width: auto;
}
</style>
