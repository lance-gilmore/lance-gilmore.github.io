import { ref } from 'vue'
import DirectionControlsComponent from './button_control/direction_control_component.js'
import ColourControlsComponent from './button_control/colour_control_component.js'
import SoundControlsComponent from './button_control/sound_control_component.js'

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