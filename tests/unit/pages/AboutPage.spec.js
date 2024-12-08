import { shallowMount } from '@vue/test-utils';
import AboutPage from '@/pages/AboutPage.vue';

describe('AboutPage', () => {
  const wrapper = shallowMount(AboutPage);

  it('wrapper text', () => {
    expect(wrapper.text()).toBe('AboutPage');
  });
});
