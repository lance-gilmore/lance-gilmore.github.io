import { ref } from 'vue'
import DirectionControlsComponent from './direction_control_component.js'
import ColourControlsComponent from './colour_control_component.js'
import SoundControlsComponent from './sound_control_component.js'

export default {
  components: {
    DirectionControlsComponent,
    ColourControlsComponent,
    SoundControlsComponent
  },
  setup() {
    return { }
  },
  template: `
<DirectionControlsComponent />

<ColourControlsComponent />

<SoundControlsComponent />  
  `
}