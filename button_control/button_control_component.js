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
<h3>Motors</h3>
<DirectionControlsComponent />

<h3>Light</h3>
<ColourControlsComponent />

<h3>Sound</h3>
<SoundControlsComponent />  
  `
}