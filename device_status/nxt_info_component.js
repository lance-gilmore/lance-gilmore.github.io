import { ref } from 'vue'

export default {
  setup() {

    return {  }
  },
  props: ['deviceName', 'bluetoothAddress', 'firmwareVersion', 'protocolVersion', 'batteryLevelMillivolts', 'batteryPercent'],

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