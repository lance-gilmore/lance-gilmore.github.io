import { ref } from 'vue'
import NXTCommands from '/../nxt/commands.js'
import NXTCommandQueue from '/../nxt/command_queue.js'

export default {
  setup() {

    const switch1 = ref('')
    const switch2 = ref('')
    const colour = ref('')
    const ultrasonic = ref('')

    return { switch1, switch2, colour, ultrasonic }
  },
  props: {commandsNXT: {type: NXTCommands, required: true}, commandQueue: {type: NXTCommandQueue, required: true}},
  mounted() {
    this.pollSensors()
  },
  methods: {
    async pollSensors() {
      let that = this
      let polling = false;
      console.log('start polling');
      while (true) {
        if (!polling) {
          polling = true;
          this.commandQueue.addCommandToQueue(function() {
            that.commandsNXT.getInputValues(switch1Port,function(res){
              console.log(res);
              that.switch1 = res.pressed
            });
          });
          this.commandQueue.addCommandToQueue(function() {
            that.commandsNXT.getInputValues(switch2Port,function(res){
              console.log(res);
              that.switch2 = res.pressed
            });
          });
          this.commandQueue.addCommandToQueue(function() {
            that.commandsNXT.getInputValues(colourPort,function(res){
              console.log(res);
              that.colour = res.colour
              
              //polling = false;
            });
          });
        }
        await commandQueue.sleep(1000);
      }
    }
  },
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