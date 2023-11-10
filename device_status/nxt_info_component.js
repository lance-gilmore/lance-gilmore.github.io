import { ref } from 'vue'
import NXTCommands from '/../nxt/commands.js'
import NXTCommandQueue from '/../nxt/command_queue.js'


export default {
  setup() {
    const devRes = ref({deviceName: '', bluetoothAddress: ''})
    const firmwareVersion = ''
    const protocolVersion = ''
    const batteryLevelMillivolts = ''
    const batteryPercent = ''
          //deviceName = 'two';
          NXTCommandQueue.addCommandToQueue(function() {
            devRes = NXTCommands.getInfoPromise();
            //deviceName = 'three';
            NXTCommands.getInfo(async function(res) {
              //deviceName = res.deviceName
              //console.log(deviceName)
              //deviceInfo.bluetoothAddress = res.bluetoothAddress
              return res
            });
          });
          NXTCommandQueue.addCommandToQueue(function() {
            NXTCommands.getVersion(async function(res) {
              //deviceInfo.firmwareVersion = res.firmwareVersion
              //deviceInfo.protocolVersion = res.protocolVersion
            });
          });
          NXTCommandQueue.addCommandToQueue(function() {
            NXTCommands.getBatteryLevel(async function(res) {
              //deviceInfo.batteryLevelMillivolts = res.batteryLevelMillivolts
              //deviceInfo.batteryPercent = res.batteryPercent
              //this.initSensors();
            });
          });

    return { devRes, firmwareVersion, protocolVersion, batteryLevelMillivolts, batteryPercent }
  },

  template: `
  <div class="p-2 info">
    <b>Device Info</b>
    <br>
    NXT name: {{ devRes.deviceName }} 
    <br>
    Bluetooth address: {{ devRes.bluetoothAddress }}
    <br>
    Firmware version: {{ firmwareVersion }}
    <br>
    Protocol version: {{ protocolVersion }}
    <br>
    Battery level millivolts: {{ batteryLevelMillivolts }} ({{ batteryPercent }}%)
  </div>
  `
}