import { ref } from 'vue'

export default {
  setup() {
    return { NXTConstants }
  },
  methods: {
    async changeLight(colour) {
        await setInputModeColour(colour,colourPort);
    }
  },
  template: `
<div>
    <button class="btn btn-secondary" type="button" @click="changeLight(NXTConstants.sensorTypes.COLOR_RED)">light red</button>
    <button class="btn btn-secondary" type="button" @click="changeLight(NXTConstants.sensorTypes.COLOR_GREEN)">light green</button>
    <button class="btn btn-secondary" type="button" @click="changeLight(NXTConstants.sensorTypes.COLOR_BLUE)">light blue</button>
    <button class="btn btn-secondary" type="button" @click="changeLight(NXTConstants.sensorTypes.COLOR_FULL)">light all</button>
    <button class="btn btn-secondary" type="button" @click="changeLight(NXTConstants.sensorTypes.COLOR_NONE)">light none</button>
</div>
  `
}