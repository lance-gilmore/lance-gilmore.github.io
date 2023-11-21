import { ref } from 'vue'
import NXTCommands from '/../nxt/commands.js'
import NXTCommandQueue from '/../nxt/command_queue.js'


export default {
  setup(props) {
    let deviceName = ref('')
    const bluetoothAddress = ref('')
    const firmwareVersion = ref('')
    const protocolVersion = ref('')
    const batteryLevelMillivolts = ref('')
    const batteryPercent = ref('')

    props.commandQueue.addCommandToQueue(function() {
        //devRes = NXTCommands.getInfoPromise();
        deviceName = 'three';
        props.commandsNXT.getInfo(async function(res) {
          //console.log(res)
          deviceName = 'four';
          //deviceName = res.deviceName
          //console.log(deviceName)
          //deviceInfo.bluetoothAddress = res.bluetoothAddress
          //return res
        });
      });
      props.commandQueue.addCommandToQueue(function() {
        props.commandsNXT.getVersion(async function(res) {
          //console.log(res)
          //deviceInfo.firmwareVersion = res.firmwareVersion
          //deviceInfo.protocolVersion = res.protocolVersion
        });
      });
      props.commandQueue.addCommandToQueue(function() {
        props.commandsNXT.getBatteryLevel(async function(res) {
          //console.log(res)
          //deviceInfo.batteryLevelMillivolts = res.batteryLevelMillivolts
          //deviceInfo.batteryPercent = res.batteryPercent
        });
      });

    return { deviceName, bluetoothAddress, firmwareVersion, protocolVersion, batteryLevelMillivolts, batteryPercent }
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