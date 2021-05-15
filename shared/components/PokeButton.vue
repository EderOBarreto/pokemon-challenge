<template>
  <button class="pok-button">
    <slot />
  </button>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
class PokeButton extends Vue {}
export default PokeButton
</script>

<style lang="scss" scoped>
@import '~/assets/scss/settings/colors.scss';
.pok-button {
  height: 56px;
  width: 265px;
  font-family: inherit;
  font-weight: 600;
  text-align: center;
  /* background-color: $shamrock; */
  color: $white;
  border-radius: 28px;
  font-size: 19px;
  cursor: pointer;
  &:hover {
    /* background-color: darken($shamrock, 7.5); */
  }
}
</style>
