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

export default {
    components: {
        ButtonControlComponent,
        KeyControlComponent,
        CodeControlComponent,
        DeviceStatusComponent
      },
  setup() {
    const switch1Port = NXTConstants.sensors.PORT_1;
    const switch2Port = NXTConstants.sensors.PORT_2;
    const colourPort = NXTConstants.sensors.PORT_3;
    const ultrasonicPort = NXTConstants.sensors.PORT_4;
    const inputPorts = {'switch1Port':switch1Port, 'switch2Port':switch2Port, 'colourPort':colourPort, 'ultrasonicPort':ultrasonicPort}

    const deviceConnected  = ref(false)
    
    return { inputPorts, colourPort, deviceConnected }
  },
  methods: {
    async connectNxt() {
      const connection = await new NXTConnection;

      const commandsNXT = new NXTCommands(connection);
      

      // TOOD: the stuff below on actual connect eventrunCom

      //NXTCommandQueue.runCommandQueue();
      //this.getAllInfo();
      //addInfoComponent()
      console.log('here')
      this.deviceConnected = true
    },

    async connectNxt2() {
      await NXT.connectDeviceSerial();
      // TOOD: the stuff below on actual connect eventrunCom

      NXTCommandQueue.runCommandQueue();
      //this.getAllInfo();
      //addInfoComponent()
      console.log('here')
      this.deviceConnected = true
    },

    async getAllInfo() {
      //deviceName = 'two';
      NXTCommandQueue.addCommandToQueue(function() {
        //deviceName = 'three';
        NXTCommands.getInfo(async function(res) {
          //deviceName = res.deviceName
          //console.log(deviceName)
          //deviceInfo.bluetoothAddress = res.bluetoothAddress
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
    },
    async initSensors() {
      await NXT.setInputModeColour(NXTConstants.sensorTypes.COLOR_NONE,this.colourPort);
      await NXT.setInputModeSwitch(this.switch1Port);
      await NXT.setInputModeSwitch(this.switch2Port);
      await NXT.initUltrasonicSensor(this.ultrasonicPort);
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
  <div ref="status_display"></div>
  <DeviceStatusComponent :inputPorts="inputPorts" />
  

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
      <KeyControlComponent/>
    </div>

    <div id="button-controls" class="tab-pane fade" role="tabpanel" aria-labelledby="button-control-tabs">
      <ButtonControlComponent :colourPort="colourPort" :commandsNXT="commandsNXT" />
    </div>

    <div class="tab-pane fade" id="code-controls" role="tabpanel" aria-labelledby="code-control-tabs">
      <CodeControlComponent/>
    </div>

  </div>

</div>
  `
}