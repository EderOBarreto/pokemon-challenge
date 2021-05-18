import { mount } from '@vue/test-utils'
import { PokeButton } from '~/shared/components'

describe('Poke Button', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(PokeButton)
    expect(wrapper.vm).toBeTruthy()
  })
})
