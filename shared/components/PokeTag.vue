<template>
  <span class="poke-tag" :class="pokemonType.toLowerCase()">{{
    pokemonType
  }}</span>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
class PokeTag extends Vue {
  @Prop({ default: '' }) pokemonType!: string
}
export default PokeTag
</script>

<style lang="scss" scoped>
@import '~/assets/scss/settings/colors.scss';
@import '~/assets/scss/tools/set-flesh-text-color.scss';

.poke-tag {
  display: inline-block;
  height: 30px;
  width: 65px;
  line-height: 30px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  border-radius: 4px;
  transition: color, background-color 500ms ease;

  @each $name, $color in $pokemon-tag-colors {
    &.#{$name} {
      background: $color;
      color: set-flash-text-color($color);
    }
  }
}
</style>
