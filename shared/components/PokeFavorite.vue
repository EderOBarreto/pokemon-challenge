<template>
  <span class="pok-favorite"> </span>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
class PokeFavorite extends Vue {}
export default PokeFavorite
</script>

<style lang="scss" scoped>
.pok-favorite {
  cursor: pointer;
}
</style>
