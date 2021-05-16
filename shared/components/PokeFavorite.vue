<template>
  <span class="poke-favorite">
    <font-awesome-icon
      :icon="[getIsFavorite ? 'fas' : 'far', 'heart']"
      @click="setIsFavorite"
    />
  </span>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
class PokeFavorite extends Vue {
  @Prop() favorited: boolean = false
  @Prop({ default: () => {} }) onChange?: Function
  isFavorite = this.favorited

  setIsFavorite() {
    this.isFavorite = !this.isFavorite
    this.onChange && this.onChange()
  }

  /** The value from prop has precedence over the local value */
  @Watch('favorited')
  setNewFavorited() {
    this.isFavorite = this.favorited
  }

  get getIsFavorite() {
    return this.isFavorite
  }
}
export default PokeFavorite
</script>

<style lang="scss" scoped>
@import '~/assets/scss/settings/colors.scss';

.poke-favorite {
  font-size: 20px;
  color: $red;
  cursor: pointer;
}
</style>
