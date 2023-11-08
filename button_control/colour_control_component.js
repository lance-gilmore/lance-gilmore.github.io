import { ref } from 'vue'

export default {
  setup() {
    let selectedColour = ref(NXTConstants.sensorTypes.COLOR_NONE)
    return { NXTConstants, selectedColour }
  },
  methods: {
    async changeLight(colour) {
        await setInputModeColour(colour,colourPort);
        selectedColour = colour
    }
  },
  template: `
<div class="my-4">
    <h3>Light</h3>
    <button :class="\`btn btn-${ selectedColour === NXTConstants.sensorTypes.COLOR_RED ? 'danger' : 'secondary' } mx-1\`" type="button" @click="changeLight(NXTConstants.sensorTypes.COLOR_RED)">red</button>
    <button class="btn btn-secondary mx-1" type="button" @click="changeLight(NXTConstants.sensorTypes.COLOR_GREEN)">green</button>
    <button class="btn btn-secondary mx-1" type="button" @click="changeLight(NXTConstants.sensorTypes.COLOR_BLUE)">blue</button>
    <button class="btn btn-secondary mx-1" type="button" @click="changeLight(NXTConstants.sensorTypes.COLOR_FULL)">all</button>
    <button class="btn btn-secondary mx-1" type="button" @click="changeLight(NXTConstants.sensorTypes.COLOR_NONE)">off</button>
</div>
  `
}