
export default {
  setup() {
    return { }
  },
  props: ['switch1Port', 'switch2Port', 'colourPort', 'ultrasonicPort'],

  template: `
  <div class="p-2 info">
    <b>Sensor Config</b>
    <br>
    Switch 1: {{ switch1Port + 1 }} 
    <br>
    Switch 2: {{ switch2Port + 1 }}
    <br>
    Colour: {{ colourPort + 1 }}
    <br>
    Ultrasonic: {{ ultrasonicPort + 1 }}
  </div>
  `
}