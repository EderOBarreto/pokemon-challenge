<template>
  <div
    class="poke-select"
    :style="{ width: `${width}px` }"
    @click="showOptions()"
  >
    <div class="label">
      {{ showValue }}
      <font-awesome-icon
        fas
        :icon="`caret-${optionsOpened ? 'up' : 'down'}`"
        class="icon"
      />
    </div>

    <ul :class="['options', { '-open': optionsOpened }]">
      <li
        v-for="option in options"
        :key="option.label"
        class="item"
        @click="setValue(option)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'

type Option = {
  label: string
}

@Component
class PokeSelect extends Vue {
  @Prop({ default: [] }) options!: any
  @Prop({ default: '' }) label?: string
  @Prop({ default: 220 }) width?: number
  @PropSync('vmodel', { type: Option }) selectedOption!: Partial<Option>
  optionsOpened = false
  setValue(option: Option) {
    this.selectedOption = option
  }

  get showValue() {
    return this.selectedOption.label
  }

  showOptions() {
    this.optionsOpened = !this.optionsOpened
  }

  // TODO: click out close options
}
export default PokeSelect
</script>

<style lang="scss" scoped>
@import '~/assets/scss/settings/colors.scss';
.poke-select {
  border: solid 1px $red;
  display: inline-block;
  min-width: 100px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  height: 40px;
  border-radius: 20px;
  color: $red;
  cursor: pointer;
}

.poke-select > .label {
  padding: 0 20px;
  line-height: 40px;
  user-select: none;
  z-index: 2;
}

.poke-select > .label > .icon {
  margin-left: 20px;
}

.poke-select > .options {
  visibility: hidden;
  transform: translate3d(0, -100%, 0);
  transition: transform 0.3s ease;
  box-shadow: 0 3px 5px rgba($black, 0.3);
  &.-open {
    visibility: visible;
    min-width: inherit;
    display: block;
    margin: 5px 0 0;
    padding: 0;
    max-height: 160px;
    line-height: 40px;
    text-align: left;
    border-radius: 5px;
    overflow-y: scroll;
    transform: translate3d(0, 0, 0);
    // TODO: improve animation
    > .item {
      z-index: 2;
      padding-left: 15px;
      &:hover {
      }
    }
  }
}
</style>
