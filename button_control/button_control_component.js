import { ref } from 'vue'
import DirectionControlsComponent from './button_control/direction_controlls_component.js'
import ColourControlsComponent from './button_control/colour_controll_component.js'
import SoundControlsComponent from './button_control/sound_controll_component.js'

export default {
  
  setup() {
    return { }
  },
  template: `
<DirectionControlsComponent />

<ColourControlsComponent />

<SoundControlsComponent />  
  `
}