import { ref, reactive } from 'vue'
import ButtonControlComponent from './button_control/button_control_component.js'
import KeyControlComponent from './key_control/key_control_component.js'
import CodeControlComponent from './code_control/code_control_component.js'
import DeviceStatusComponent from './device_status/device_status_component.js'
import NXTConstants from './nxt/config.js'
import NXTCommands from './nxt/commands.js'
import NXTCommandQueue from './nxt/command_queue.js'
import NXTConnection from './nxt/device_connection.js'
import NXTSimplifiedCommands from './nxt/simplified_commands.js'
import NXTDeviceReader from './nxt/device_reader.js'
import SensorReadings from './nxt/sensor_readings.js'

export default {
    components: {
        ButtonControlComponent,
        KeyControlComponent,
        CodeControlComponent,
        DeviceStatusComponent
      },
  setup(props) {
    const switch1Port = NXTConstants.sensors.PORT_1;
    const switch2Port = NXTConstants.sensors.PORT_2;
    const colourPort = NXTConstants.sensors.PORT_3;
    const ultrasonicPort = NXTConstants.sensors.PORT_4;
    const inputPorts = {'switch1Port':switch1Port, 'switch2Port':switch2Port, 'colourPort':colourPort, 'ultrasonicPort':ultrasonicPort}

    
    let sensorReadingsInit = new SensorReadings()
    const sensorReadings = reactive(sensorReadingsInit)

    const deviceReader = new NXTDeviceReader(props.connection, sensorReadings)
    const commandsNXT = new NXTCommands(props.connection, deviceReader);
    const simpleCommands = new NXTSimplifiedCommands(commandsNXT)
    const commandQueue = new NXTCommandQueue(deviceReader)
     
    return { inputPorts, colourPort, commandsNXT, simpleCommands, commandQueue, sensorReadings }
  },

  props: {connection: {type: NXTConnection, required: true}},

  mounted() {
    this.initSensors(this.commandsNXT, this.inputPorts)
  },

  methods: {
    async initSensors(commandsNXT, inputPorts) {
      await commandsNXT.setInputModeColour(NXTConstants.sensorTypes.COLOR_NONE,inputPorts.colourPort);
      await commandsNXT.setInputModeSwitch(inputPorts.switch1Port);
      await commandsNXT.setInputModeSwitch(inputPorts.switch2Port);
      //await this.commandsNXT.initUltrasonicSensor(this.inputPorts.ultrasonicPort);
    }
  },

  template: `
  <div ref="status_display"></div>
  <DeviceStatusComponent :inputPorts="inputPorts" :commandsNXT="commandsNXT" :commandQueue="commandQueue" :sensorReadings="sensorReadings" />
  
  <ul class="nav nav-tabs mt-4" id="controlTabs" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active" id="remote-control-tabs" data-bs-toggle="tab" data-bs-target="#remote-controls" type="button" role="tab" aria-controls="remote-controls" aria-selected="true">Key Control</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="button-control-tabs" data-bs-toggle="tab" data-bs-target="#button-controls" type="button" role="tab" aria-controls="button-controls" aria-selected="false">Button Control</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="code-control-tasb" data-bs-toggle="tab" data-bs-target="#code-controls" type="button" role="tab" aria-controls="code-controls" aria-selected="false">Code Control</button>
    </li>
  </ul>

  <div class="tab-content" id="controlTabsContent">

    <div id="remote-controls" class="tab-pane fade show active" role="tabpanel" aria-labelledby="remote-control-tabs">
      <KeyControlComponent :simpleCommands="simpleCommands" />
    </div>

    <div id="button-controls" class="tab-pane fade" role="tabpanel" aria-labelledby="button-control-tabs">
      <ButtonControlComponent :colourPort="colourPort" :commandsNXT="commandsNXT" :simpleCommands="simpleCommands" />
    </div>

    <div class="tab-pane fade" id="code-controls" role="tabpanel" aria-labelledby="code-control-tabs">
      <CodeControlComponent :simpleCommands="simpleCommands" :sensorReadings="sensorReadings" :commandQueue="commandQueue" />
    </div>

  </div>
  `
}