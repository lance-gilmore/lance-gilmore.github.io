import { ref } from 'vue'
import NXTConstants from '/../nxt/config.js'
import NXTCommandQueue from '/../nxt/command_queue.js'
import CodeEditor from './code_editor.js'
import SensorReadings from '/../nxt/sensor_readings.js'
import NXTCommands from '/../nxt/simplified_commands.js'


export default {
  components: {
    CodeEditor
  },

  setup() {
    const running = ref(false)

    return { NXTConstants, running }
  },

  props: {sensorReadings: {type: SensorReadings}, simpleCommands: {type: NXTCommands, required: true}, commandQueue: {type: NXTCommandQueue, required: true}},

  methods: {
      async runCode() {
        let motorAMoving = false
        function motorAForward() {
          if (motorAMoving !== 'forward') {
            motorAMoving = 'forward'
            this.simpleCommands.forwardMotor(NXTConstants.motors.PORT_A)
          }
        }
        function motorABackward() {
          if (motorAMoving !== 'backward') {
            motorAMoving = 'backward'
            this.simpleCommands.backwardMotor(NXTConstants.motors.PORT_A)
          }
        }
        function motorAStop() {
          if (motorAMoving !== false) {
            motorAMoving = false
            this.simpleCommands.stopMotor(NXTConstants.motors.PORT_A)
          }
        }

        let motorBMoving = false
        function motorBForward() {
          if (motorBMoving !== 'forward') {
            motorBMoving = 'forward'
            this.simpleCommands.forwardMotor(NXTConstants.motors.PORT_B)
          }
        }
        function motorBBackward() {
          if (motorBMoving !== 'backward') {
            motorBMoving = 'backward'
            this.simpleCommands.backwardMotor(NXTConstants.motors.PORT_B)
          }
        }
        function motorBStop() {
          if (motorBMoving !== false) {
            motorBMoving = false
            this.simpleCommands.stopMotor(NXTConstants.motors.PORT_B)
          }
        }

        let motorCMoving = false
        function motorCForward() {
          if (motorCMoving !== 'forward') {
            motorCMoving = 'forward'
            this.simpleCommands.forwardMotor(NXTConstants.motors.PORT_V)
          }
        }
        function motorCBackward() {
          if (motorCMoving !== 'backward') {
            motorCMoving = 'backward'
            this.simpleCommands.backwardMotor(NXTConstants.motors.PORT_C)
          }
        }
        function motorCStop() {
          if (motorCMoving !== false) {
            motorCMoving = false
            this.simpleCommands.stopMotor(NXTConstants.motors.PORT_C)
          }
        }

        let beeping = false
        function beep() {
          if (!beeping) {
            beeping = true
            this.simpleCommands.simpleBeep()
            setTimeout(function(){beeping = false},1000)
          }
        }
        
        let sensorReadings = this.sensorReadings

        this.running = true
        let code = this.$refs.codeEditor.editorCode
        eval(code);
        this.running = false
      },

      stopCode() {
        this.running = false
      }
  },

  template: `
  <p>Code to execute</p>
  <div class="row mb-1">
      <CodeEditor ref="codeEditor" />
  </div>

  <button v-if="!running" type="btn" class="btn btn-primary" @click="runCode">run</button>
  <button v-if="running" type="btn" class="btn btn-primary" @click="stopCode">stop</button>

  <h3>Commands</h3>
  <ul>
    <li>motorAForward()</li>
    <li>motorABackward()</li>
    <li>motorAStop()</li>
    <li>motorBForward()</li>
    <li>motorBBackward()</li>
    <li>motorBStop()</li>
    <li>motorCForward()</li>
    <li>motorCBackward()</li>
    <li>motorCStop()</li>
    <li>beep()</li>
    <li>sensorReadings.switch1</li>
    <li>sensorReadings.switch2</li>
    <li>sensorReadings.colour.colour <i>black, blue, green, yellow, red, white</i></li>
    <li>sensorReadings.colour.scaledValue <i>0=dark, 1023=light</i></li>
  </ul>

  <h3>Examples</h3>
  <div class="row" style="white-space: pre-wrap;">
    <b>Beep when switch1 is pressed</b>

    <p>
    if (sensorReadings.switch1) {
      beep()
    }
    </p>


    <b>Drive motors BC with buttons</b>

    <p>
    while(this.running) {
      if (sensorReadings.switch1) {
        motorBForward()
      } else {
        motorBStop()
      }
      if (sensorReadings.switch2) {
        motorCForward()
      } else {
        motorCStop()
      }
    }
    </p>
  </div>
  `
}