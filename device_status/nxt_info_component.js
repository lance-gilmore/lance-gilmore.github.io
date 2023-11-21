import { ref } from 'vue'
import NXTCommands from '/../nxt/commands.js'
import NXTCommandQueue from '/../nxt/command_queue.js'

export default {
  setup() {
    const deviceName = ref('')
    const bluetoothAddress = ref('')
    const firmwareVersion = ref('')
    const protocolVersion = ref('')
    const batteryLevelMillivolts = ref('')
    const batteryPercent = ref('')

    return { deviceName, bluetoothAddress, firmwareVersion, protocolVersion, batteryLevelMillivolts, batteryPercent }
  },
  mounted() {
    let that = this
    this.commandQueue.addCommandToQueue(function() {
      that.commandsNXT.getInfo(async function(res) {
        that.deviceName = res.deviceName;
        that.bluetoothAddress = res.bluetoothAddress
      });
    });
    this.commandQueue.addCommandToQueue(function() {
      that.commandsNXT.getVersion(async function(res) {
        that.firmwareVersion = res.firmwareVersion
        that.protocolVersion = res.protocolVersion
      });
    });
    this.commandQueue.addCommandToQueue(function() {
      that.commandsNXT.getBatteryLevel(async function(res) {
        that.batteryLevelMillivolts = res.batteryLevelMillivolts
        that.batteryPercent = res.batteryPercent
      });
    });
  },
  props: {commandsNXT: {type: NXTCommands, required: true}, commandQueue: {type: NXTCommandQueue, required: true}},
  template: `
  <div class="p-2 info">
    <b>Device Info</b>
    <br>
    NXT name: {{ deviceName }} 
    <br>
    Bluetooth address: {{ bluetoothAddress }}
    <br>
    Firmware version: {{ firmwareVersion }}
    <br>
    Protocol version: {{ protocolVersion }}
    <br>
    Battery level millivolts: {{ batteryLevelMillivolts }} ({{ batteryPercent }}%)
  </div>
  `
}