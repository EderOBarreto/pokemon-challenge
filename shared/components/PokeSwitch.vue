<template>
  <label class="poke-switch">
    <input type="checkbox" v-model="isChecked" />
    <span class="slider"></span>
  </label>
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
  position: relative;
  display: inline-block;
  width: 40px;
  height: 22px;
}

.poke-switch > input {
  opacity: 0;
  width: 0;
  height: 0;
}

.poke-switch > input:checked + .slider {
  background-color: $red;
}

.poke-switch > input:focus + .slider {
  box-shadow: 0 0 1px $red;
}

.poke-switch > input:checked + .slider:before {
  transform: translateX(18px);
}

.poke-switch > .slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 20px;
  &::before {
    border-radius: 50%;
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 3px;
    bottom: 3px;
    background-color: $white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
}
</style>
