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
    return { NXTConstants }
  },

  props: {sensorReadings: {type: SensorReadings}, simpleCommands: {type: NXTCommands, required: true}, commandQueue: {type: NXTCommandQueue, required: true}},

  methods: {
      runCode() {
        let code = this.$refs.codeEditor.editorCode
        eval(code);
    }
  },

  template: `
  <p>Code to execute</p>
  <div class="row">
      <CodeEditor ref="codeEditor" />
  </div>

  <button type="btn" class="btn btn-primary" @click="runCode">run</button>
  `
}