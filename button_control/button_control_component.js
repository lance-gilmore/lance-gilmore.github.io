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
  props: ['colourPort', 'commandsNXT'],
  template: `
<DirectionControlsComponent />

<ColourControlsComponent :colourPort="colourPort" :commandsNXT="commandsNXT" />

<SoundControlsComponent />  
  `
}