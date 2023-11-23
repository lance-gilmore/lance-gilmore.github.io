import { ref } from 'vue'
import ButtonControlComponent from './button_control/button_control_component.js'
import KeyControlComponent from './key_control/key_control_component.js'
import CodeControlComponent from './code_control/code_control_component.js'
import DeviceStatusComponent from './device_status/device_status_component.js'
import NXTConstants from './nxt/config.js'
import NXT from './nxt/nxt.js'
import NXTCommands from './nxt/commands.js'
import NXTCommandQueue from './nxt/command_queue.js'
import NXTConnection from './nxt/device_connection.js'
import NXTSimplifiedCommands from './nxt/simplified_commands.js'
import NXTDeviceReader from './nxt/device_reader.js'
import SensorReadings from './nxt/sensor_readings.js'
import ConnectedComponent from './connected_component.js'

export default {
    components: {
        ButtonControlComponent,
        KeyControlComponent,
        CodeControlComponent,
        DeviceStatusComponent,
        ConnectedComponent
      },
  setup() {
    const deviceConnected  = ref(false)
    const connection = {}
    
    return { deviceConnected, connection }
  },
  methods: {
    async connectNxt() {
      this.connection = await new NXTConnection;
      let that = this
      let refreshIntervalId = setInterval(function(){
        if (that.connection.NXTPort !== undefined) {
          that.deviceConnected = true
          clearInterval(refreshIntervalId);
        }
      },100);

    }
  },

  template: `
  <div v-if="!deviceConnected">
    <button class="btn btn-primary" type="button" id="connectDeviceBtn" @click="connectNxt">connect</button>
    <p>Ubuntu serial connect:
    <ul>
    <li>in terminal:</li>
    <li>sudo adduser lance dialout (then restart machine)</li>
    <li>rfcomm bind /dev/rfcomm0 00:16:53:0D:F6:08 1</li>
    <li>test/complete connection with:</li>
    <li>sudo l2ping 00:16:53:0D:F6:08</li>
    <li>should be able to connect from chrome now (may need to change access on rfcomm so you dont have to run command as sudo)</li>
    </ul>
    </p>
    <a href="https://github.com/lance-gilmore/lance-gilmore.github.io">github repo</a>
  </div>

<div v-if="deviceConnected">
  <ConnectedComponent :connection="connection" />
</div>
  `
}