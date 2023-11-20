import DirectionControlsComponent from './direction_control_component.js'
import ColourControlsComponent from './colour_control_component.js'
import SoundControlsComponent from './sound_control_component.js'
import SimplifiedCommands from '../nxt/simplified_commands.js'
import NXTCommands from '/../nxt/commands.js'

export default {
  components: {
    DirectionControlsComponent,
    ColourControlsComponent,
    SoundControlsComponent
  },
  setup() {
    return { }
  },
  props: {colourPort: Number, commandsNXT: {type: NXTCommands, required: true}, simpleCommands: {type: SimplifiedCommands, required: true}},
  template: `
<DirectionControlsComponent :simpleCommands="simpleCommands" />

<ColourControlsComponent :colourPort="colourPort" :commandsNXT="commandsNXT" />

<SoundControlsComponent :simpleCommands="simpleCommands" />  
  `
}