import { ref } from 'vue'
import NXTConstants from '/../nxt/config.js'
import NXTCommands from '/../nxt/commands.js'

export default {
  setup() {
    const selectedColour = ref(NXTConstants.sensorTypes.COLOR_NONE)
    return { NXTConstants, selectedColour }
  },
  props: ['colourPort'],
  methods: {
    async changeLight(colour) {
        await NXTCommands.setInputModeColour(colour,this.colourPort);
        this.selectedColour = colour
    }
  },
  template: `
<div class="my-4">
    <h3>Light</h3>
    <button class="btn mx-1" :class="selectedColour === NXTConstants.sensorTypes.COLOR_RED ? 'btn-danger' : 'btn-secondary'" type="button" @click="changeLight(NXTConstants.sensorTypes.COLOR_RED)">red</button>
    <button class="btn mx-1" :class="selectedColour === NXTConstants.sensorTypes.COLOR_GREEN ? 'btn-success' : 'btn-secondary'" type="button" @click="changeLight(NXTConstants.sensorTypes.COLOR_GREEN)">green</button>
    <button class="btn mx-1" :class="selectedColour === NXTConstants.sensorTypes.COLOR_BLUE ? 'btn-primary' : 'btn-secondary'" type="button" @click="changeLight(NXTConstants.sensorTypes.COLOR_BLUE)">blue</button>
    <button class="btn mx-1" :class="selectedColour === NXTConstants.sensorTypes.COLOR_FULL ? 'btn-light' : 'btn-secondary'" type="button" @click="changeLight(NXTConstants.sensorTypes.COLOR_FULL)">all</button>
    <button class="btn mx-1" :class="selectedColour === NXTConstants.sensorTypes.COLOR_NONE ? 'btn-dark' : 'btn-secondary'" type="button" @click="changeLight(NXTConstants.sensorTypes.COLOR_NONE)">off</button>
</div>
  `
}