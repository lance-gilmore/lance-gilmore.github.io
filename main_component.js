import { ref } from 'vue'
import ButtonControlComponent from './button_control_component.js'

export default {
    components: {
        ButtonControlComponent
      },
  setup() {
    return { NXTConstants }
  },

  template: `
    <ButtonControlComponent/>
  `
}