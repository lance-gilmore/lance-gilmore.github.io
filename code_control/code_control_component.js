import { ref } from 'vue'
import NXTConstants from './nxt/config.js'
import NXT from '/../nxt/nxt.js'
import NXTCommandQueue from '/../nxt/command_queue.js'
import CodeEditor from './code_editor.js'

export default {
  setup() {
    return { NXTConstants }
  },
  methods: {
    pollSensors() {
        let polling = false;
        console.log('start polling');
        while (true) {
          if (!polling) {
            polling = true;
            NXTCommandQueue.addCommandToQueue(function() {
              NXT.getInputValues(switch1Port,function(res){
                console.log(res);
                $('#switch1').text(res.pressed);
              });
            });
            NXTCommandQueue.addCommandToQueue(function() {
              NXT.getInputValues(switch2Port,function(res){
                console.log(res);
                $('#switch2').text(res.pressed);
              });
            });
            NXTCommandQueue.addCommandToQueue(function() {
              NXT.getInputValues(colourPort,function(res){
                console.log(res);
                $('#colourSensor').text(res.colour);
                
                polling = false;
              });
            });
          }
          sleep(1000);
        }
      },
      runCode() {
        this.pollSensors();
        let code = $('#code-input').val();
        eval(code);
    }
  },

  template: `
  <p>Code to execute</p>
  <div class="row">
    <div class="col col-8">
      <CodeEditor />
    </div>
    <div class="col">
      <p>sensors:</p>
      <p>switch1:<span id="switch1"></span></p>
      <p>switch2:<span id="switch2"></span></p>
      <p>colour:<span id="colourSensor"></span></p>
      <p>distance:<span id="distanceSensor"></span></p>
    </div>
  </div>

  <button type="btn" class="btn btn-primary" @click="runCode">run</button>
  `
}