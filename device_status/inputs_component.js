import { ref } from 'vue'
import NXTCommands from '/../nxt/commands.js'
import NXTCommandQueue from '/../nxt/command_queue.js'

export default {
  setup() {

    const switch1 = ref('')
    const switch2 = ref('')
    const colour = ref('')
    const ultrasonic = ref('')
    const refreshIntervalId = ref(0)

    return { switch1, switch2, colour, ultrasonic, refreshIntervalId }
  },
  props: {sensorReadings: {type: Object}, inputPorts: {type: Object}, commandsNXT: {type: NXTCommands, required: true}, commandQueue: {type: NXTCommandQueue, required: true}},
  mounted() {
    console.log(this.sensorReadings)
    //this.addListeners()
    //this.pollSensors()
  },
  methods: {
    async sendPolling() {
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
      },100)
    },
    stopPolling() {
      clearInterval(this.refreshIntervalId);
    },
    async pollSensors() {
      let that = this
      let polling = false;

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
    Colour sensor: {{ sensorReadings.colour.colour }} ( {{ sensorReadings.colour.scaledValue }} )
    <br>
    Ultrasonic: {{ ultrasonic }}

    <button class="btn btn-danger" type="button" @click="sendPolling()">Polling</button>
    <button class="btn btn-danger" type="button" @click="stopPolling()">stop Polling</button>
  </div>
  `
}