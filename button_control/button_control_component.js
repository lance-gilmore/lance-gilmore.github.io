import { ref } from 'vue'
import DirectionControlsComponent from './direction_controlls_component.js'
import ColourControlsComponent from './colour_controll_component.js'
import SoundControlsComponent from './sound_controll_component.js'

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