import { ref } from 'vue'

export default {
  setup() {
          //deviceName = 'two';
          NXTCommandQueue.addCommandToQueue(function() {
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

    return {  }
  },

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