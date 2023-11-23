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
  props: {sensorReadings: {type: Object}, inputPorts: {type: Object}, commandsNXT: {type: NXTCommands, required: true}, commandQueue: {type: NXTCommandQueue, required: true}},
  mounted() {
    //this.addListeners()
    //this.pollSensors()
  },
  methods: {
    async addListeners() {
      let that = this
      this.commandsNXT.addSwitchListener(function(res){
        if (res.port === that.inputPorts.switch1Port) {
          that.switch1 = res.pressed
        } else {
          that.switch2 = res.pressed
        }
      })
      this.commandsNXT.addColourListener(function(res){
        console.log('colour callback')
        console.log(res);
        that.colour = res.colour+' ('+res.scaledValue+')'
      })
    },
    async sendPolling() {
      let that = this
      this.commandQueue.addCommandToQueue(function() {
        that.commandsNXT.getInputValues(that.inputPorts.switch1Port)
      })
      this.commandQueue.addCommandToQueue(function() {
        that.commandsNXT.getInputValues(that.inputPorts.switch2Port)
      })
      this.commandQueue.addCommandToQueue(function() {
        that.commandsNXT.getInputValues(that.inputPorts.colourPort)
      })
    },
    async pollSensors() {
      let that = this
      let polling = false;

      this.commandsNXT.addSwitchListener(function(res){
        console.log('switch callback')
        console.log(res);
        if (res.port === that.inputPorts.switch1Port) {
          that.switch1 = res.pressed
        } else {
          that.switch2 = res.pressed
        }
      })

      console.log('start polling');
      while (true) {
        if (!polling) {
          polling = true;

          this.commandQueue.addCommandToQueue(function() {
            that.commandsNXT.getInputValues(that.inputPorts.switch1Port
             // ,function(res){
             // console.log(res);
             // that.switch1 = res.pressed
            //}
            );
          });
          this.commandQueue.addCommandToQueue(function() {
            that.commandsNXT.getInputValues(that.inputPorts.switch2Port
              //,function(res){
              //console.log(res);
              //that.switch2 = res.pressed
            //}
            );
          });
          this.commandQueue.addCommandToQueue(function() {
            that.commandsNXT.getInputValues(that.inputPorts.colourPort,function(res){
              console.log(res);
              that.colour = res.colour
              
              polling = false;
            });
          });
        }
        await this.commandQueue.sleep(1000);
      }
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
    Colour sensor: {{ sensorReadings.colour.colour }} ( {{ res.colour.scaledValue }} )
    <br>
    Ultrasonic: {{ ultrasonic }}

    <button class="btn btn-danger" type="button" @click="sendPolling()">Polling</button>
  </div>
  `
}