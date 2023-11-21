import NxtInfoComponent from './nxt_info_component.js'
import InputsComponent from './inputs_component.js'
import SensorConfigComponent from './sensor_config_component.js'
import NXTCommandQueue from './../nxt/command_queue.js'
import NXTCommands from './../nxt/commands.js'

export default {
    components: {
        SensorConfigComponent,
        NxtInfoComponent,
        InputsComponent
      },
  setup() {
    return {  }
  },
  props: {inputPorts: Object, commandsNXT: {type: NXTCommands, required: true}, commandQueue: {type: NXTCommandQueue, required: true}},
 
  template: `
  <div class="row">
    <div class="col">
      <NxtInfoComponent :commandsNXT="commandsNXT" :commandQueue="commandQueue" />
    </div>
    <div class="col">
      <SensorConfigComponent :switch1Port="inputPorts.switch1Port" :switch2Port="inputPorts.switch2Port" :colourPort="inputPorts.colourPort" :ultrasonicPort="inputPorts.ultrasonicPort"  />
    </div>
    <div class="col">
      <InputsComponent :commandsNXT="commandsNXT" :commandQueue="commandQueue" :inputPorts="inputPorts" />
    </div>
  </div>
  `
}