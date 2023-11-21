import { ref } from 'vue'
import NXTCommands from '/../nxt/commands.js'
import NXTCommandQueue from '/../nxt/command_queue.js'


export default {
  setup(props) {
    const deviceName = ref('')
    const bluetoothAddress = ref('')
    const firmwareVersion = ref('')
    const protocolVersion = ref('')
    const batteryLevelMillivolts = ref('')
    const batteryPercent = ref('')



    return { deviceName, bluetoothAddress, firmwareVersion, protocolVersion, batteryLevelMillivolts, batteryPercent }
  },
  mounted() {
    this.deviceName = 'onez'
    let that = this
    this.commandQueue.addCommandToQueue(function() {
      //devRes = NXTCommands.getInfoPromise();
      that.deviceName = 'three';
      that.commandsNXT.getInfo(async function(res) {
        //console.log(res)
        that.deviceName = 'four';
        //deviceName = res.deviceName
        //console.log(deviceName)
        //deviceInfo.bluetoothAddress = res.bluetoothAddress
        //return res
      });
    });
    this.commandQueue.addCommandToQueue(function() {
      that.commandsNXT.getVersion(async function(res) {
        //console.log(res)
        //deviceInfo.firmwareVersion = res.firmwareVersion
        //deviceInfo.protocolVersion = res.protocolVersion
      });
    });
    this.commandQueue.addCommandToQueue(function() {
      that.commandsNXT.getBatteryLevel(async function(res) {
        //console.log(res)
        //deviceInfo.batteryLevelMillivolts = res.batteryLevelMillivolts
        //deviceInfo.batteryPercent = res.batteryPercent
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