<template>
  <div class="poke-switch" :style="{ width: `${width}px` }"></div>
</template>
<script lang="ts">
import { Component, PropSync, Vue } from 'vue-property-decorator'

@Component
class PokeSwitch extends Vue {
  @PropSync('vmodel') isChecked!: boolean
}
export default PokeSwitch
</script>

<style lang="scss" scoped>
@import '~/assets/scss/settings/colors.scss';
.poke-switch {
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
