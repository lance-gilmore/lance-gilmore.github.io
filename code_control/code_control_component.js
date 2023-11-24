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
  `
}