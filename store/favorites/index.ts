import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({
  name: 'favorites',
  namespaced: true,
  stateFactory: true,
})
export default class Calendar extends VuexModule {
  favorites: Array<string> = []

  @Mutation
  saveFavorite(newFavoriteId: string) {
    if (this.favorites.includes(newFavoriteId)) {
      this.favorites = this.favorites.filter((id) => id !== newFavoriteId)
    } else {
      this.favorites = [...this.favorites, newFavoriteId]
    }
  }

  get getFavorites() {
    return this.favorites
  }
}
