<template>
  <div class="poke-filters">
    <h3>{{ title }}</h3>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

// TODO: Create component formula
@Component
class PokeFilters extends Vue {
  @Prop({ default: '' }) title?: string
  @Prop({ default: [] }) types!: Array<any>
}
export default PokeFilters
</script>

<style lang="scss" scoped></style>
