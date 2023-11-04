import { ref } from 'vue'


export default {
  
  setup() {
    import ButtonControlComponent from './button_control_component.js'
    return { NXTConstants, ButtonControlComponent }
  },
  template: `
    <ButtonControlComponent/>
  `
}