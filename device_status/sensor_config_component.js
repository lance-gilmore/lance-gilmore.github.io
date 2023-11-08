
export default {
  setup() {
    return { }
  },
  props: ['switch1Port', 'switch2Port', 'colourPort', 'ultrasonicPort'],

  template: `
  <div class="p-2 info">
    <b>Sensor Config</b>
    Switch 1: {{ switch1Port }} 
    <br>
    Switch 2: {{ switch2Port }}
    <br>
    Colour: {{ colourPort }}
    <br>
    Ultrasonic: {{ ultrasonicPort }}
  </div>
  `
}