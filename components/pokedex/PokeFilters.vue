<template>
  <div class="poke-filters">
    <h3 class="title">{{ title }}</h3>
    <div class="tags">
      <span
        v-for="type of pokemonTypes"
        :key="type"
        :class="['pill', selectedTypes.includes(type) ? '-selected' : '']"
        @click="setSelectedType(type)"
      >
        {{ type }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'
import { pokemonTypes } from './pokemonTypes'
import { PokeTag } from '~/shared/components'
@Component({
  components: { PokeTag },
  data() {
    return {
      pokemonTypes,
    }
  },
})
class PokeFilters extends Vue {
  @Prop({ default: '' }) title?: string
  @PropSync('vmodel') selectedTypes!: Array<string>
  // TODO: may add a debounce to filter the list after the
  // user stop selecting avoiding over processing
  setSelectedType(selectedType: string) {
    if (this.selectedTypes.includes(selectedType)) {
      this.selectedTypes = this.selectedTypes.filter(
        (type) => type !== selectedType
      )
    } else {
      this.selectedTypes = [...this.selectedTypes, selectedType]
    }
  }
}
export default PokeFilters
</script>

<style lang="scss" scoped>
/* @import '~/assets/'; */
@import '~/assets/scss/settings/colors.scss';

.poke-filters > .title {
  font-size: 16px;
  color: $font;
  margin-bottom: 25px;
  font-weight: 600;
}

.poke-filters > .tags > .pill {
  font-size: 16px;
  border: solid 2px $red;
  color: $red;
  font-weight: 600;
  padding: 12px 20px;
  display: inline-block;
  margin-bottom: 10px;
  margin-right: 10px;
  border-radius: 25px;
  cursor: pointer;
  user-select: none;

  &:first-letter {
    text-transform: capitalize;
  }

  &.-selected {
    color: $white;
    background: $red;
  }
}
</style>
