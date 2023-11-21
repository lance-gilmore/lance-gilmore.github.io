import { ref } from 'vue'

export default {
  setup() {

    const switch1 = ref('')
    const switch2 = ref('')
    const colour = ref('')
    const ultrasonic = ref('')

    return { switch1, switch2, colour, ultrasonic }
  },
  props: {commandsNXT: {type: NXTCommands, required: true}, commandQueue: {type: NXTCommandQueue, required: true}},

  template: `
  <div class="p-2 info">
    <b>Inputs</b>
    <br>
    Switch 1: {{ switch1 }}
    <br>
    Switch 2: {{ switch2 }}
    <br>
    Colour sensor: {{ colour }}
    <br>
    Ultrasonic: {{ ultrasonic }}
  </div>
  `
}