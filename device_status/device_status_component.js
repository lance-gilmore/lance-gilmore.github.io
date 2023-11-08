import { ref } from 'vue'
import NxtInfoComponent from './nxt_info_component.js'
import InputsComponent from './inputs_component.js'
import SensorConfigComponent from './sensor_config_component.js'

export default {
    components: {
        SensorConfigComponent,
        NxtInfoComponent,
        InputsComponent
      },
  setup() {
    let deviceName = ref('')
    let bluetoothAddress = ref('')
    let firmwareVersion = ref('')
    let protocolVersion = ref('')
    let batteryLevelMillivolts = ref('')
    let batteryPercent = ref('')
    const switch1 = ref('')
    const switch2 = ref('')
    const colour = ref('')
    const ultrasonic = ref('')

    return { deviceInfo, deviceName, bluetoothAddress, firmwareVersion, protocolVersion, batteryLevelMillivolts, batteryPercent,
    switch1, switch2, colour, ultrasonic }
  },
  props: ['inputPorts'],
  methods: {
  },

  template: `
  <div class="row">
    <div class="col">
      <NxtInfoComponent :deviceName="deviceName" :bluetoothAddress="bluetoothAddress" :firmwareVersion="firmwareVersion" :protocolVersion="protocolVersion" :batteryLevelMillivolts="batteryLevelMillivolts" :batteryPercent="batteryPercent" />
    </div>
    <div class="col">
      <SensorConfigComponent switch1Port="inputPorts.switch1Port" switch2Port="inputPorts.switch2Port" colourPort="inputPorts.colourPort" ultrasonicPort="inputPorts.ultrasonicPort"  />
    </div>
    <div class="col">
      <InputsComponent :switch1="switch1" :switch2="switch2" :colour="colour" :ultrasonic="ultrasonic" />
    </div>
  </div>
  `
}