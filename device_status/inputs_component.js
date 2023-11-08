import { ref } from 'vue'

export default {
  setup() {

    return {  }
  },
  props: ['switch1', 'switch2', 'colour', 'ultrasonic'],

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