<template>
  <div class="poke-input" :style="{ width: `${width}px` }">
    <input :placeholder="placeholder" class="input" @input="debounceSearch" />
    <font-awesome-icon fas icon="search" class="icon" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'

@Component
class PokeInput extends Vue {
  @Prop({ default: '' }) placeholder?: string
  @Prop({ default: 300 }) width?: number
  @PropSync('vmodel') searchTerm!: string
  debounce: any = null
  debounceSearch(event: any) {
    clearTimeout(this.debounce)
    this.debounce = setTimeout(() => {
      this.searchTerm = event.target.value
    }, 500)
  }
}
export default PokeInput
</script>

<style lang="scss" scoped>
@import '~/assets/scss/settings/colors.scss';
.poke-input {
  border-radius: 20px;
  height: 40px;
  background-color: #f2f2f2;
  padding: 0px 15px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
}

.poke-input > .input {
  border: 0px;
  font-size: 14px;
  line-height: 40px;
  height: 40px;
  padding: 0px;
  background-color: transparent;
}

.poke-input > .icon {
  color: $red;
}
</style>
