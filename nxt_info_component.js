import { ref } from 'vue'

export default {
  setup() {

    return {  }//deviceName, bluetoothAddress, firmwareVersion, protocolVersion, batteryLevelMillivolts, batteryPercent
  },
  props: ['deviceName', 'bluetoothAddress', 'firmwareVersion', 'protocolVersion', 'batteryLevelMillivolts', 'batteryPercent'],

  template: `
  <div class="p-2">
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