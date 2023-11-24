import { ref } from 'vue'
import NXTCommands from '/../nxt/commands.js'
import NXTCommandQueue from '/../nxt/command_queue.js'
import SensorReadings from '/../nxt/sensor_readings.js'

export default {
  setup() {
    const refreshIntervalId = ref(0)
    const polling = ref(false)

    return { refreshIntervalId, polling }
  },

  props: {sensorReadings: {type: SensorReadings}, inputPorts: {type: Object}, commandsNXT: {type: NXTCommands, required: true}, commandQueue: {type: NXTCommandQueue, required: true}},

  methods: {
    async startPolling() {
      this.polling = true
      let that = this
      that.refreshIntervalId = setInterval(function(){
        that.commandQueue.addCommandToQueue(function() {
          that.commandsNXT.getInputValues(that.inputPorts.switch1Port)
        })
        that.commandQueue.addCommandToQueue(function() {
          that.commandsNXT.getInputValues(that.inputPorts.switch2Port)
        })
        that.commandQueue.addCommandToQueue(function() {
          that.commandsNXT.getInputValues(that.inputPorts.colourPort)
        })
      },200)
    },
    stopPolling() {
      this.polling = false
      clearInterval(this.refreshIntervalId);
    }
  },
  template: `
  <div class="p-2 info">
    <b>Inputs</b>
    <br>
    Switch 1: {{ sensorReadings.switch1 }}
    <br>
    Switch 2: {{ sensorReadings.switch2 }}
    <br>
    Colour sensor: {{ sensorReadings.colour.colour }} ( {{ sensorReadings.colour.scaledValue }} )
    <br>
    Ultrasonic: {{ sensorReadings.ultrasonic }}
    <br>

    <button v-if="!polling" class="btn btn-primary" type="button" @click="startPolling()">go</button>
    <button v-if="polling" class="btn btn-primary" type="button" @click="stopPolling()">stop</button>
  </div>
  `
}