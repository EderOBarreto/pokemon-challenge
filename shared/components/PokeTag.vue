<template>
  <span class="pok-tag" :class="pokemonType">{{ pokemonType }}</span>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
class PokTag extends Vue {
  @Prop({ default: '' }) pokemonType!: string
}
export default PokTag
</script>

<style lang="scss" scoped>
@import '~/assets/scss/settings/colors.scss';
.pok-tag {
  display: inline-block;
  height: 24px;
  width: 60px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  border-radius: 12px;
  /* background-color: $ghost-white; */
  transition: color, background-color 500ms ease;
  &.grass,
  &.poison,
  &.fire {
    &:hover {
      /* color: $ghost-white; */
    }
  }
  &.grass,
  &.poison {
    /* color: $aquamarine; // change depending on the pokemon type */
  }
  &.poison:hover {
    /* background-color: $aquamarine; */
  }
  &.fire {
    /* color: $tiger-eye; */
    &:hover {
      /* background-color: $tiger-eye; */
    }
  }
}
</style>
