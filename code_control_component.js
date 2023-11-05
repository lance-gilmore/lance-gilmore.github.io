import { ref } from 'vue'

export default {
  setup() {
    return { NXTConstants }
  },
  mount() {
    const codeInput = document.querySelector('#code-input');
    const codeOutput = document.querySelector('#code-output');
  
    // initialise the highlighted output with whatever is in the input
    codeOutput.textContent = codeInput.value;
    hljs.highlightBlock(codeOutput);
  
    codeInput.addEventListener('input', (event) => {
      codeOutput.textContent = codeInput.value;
      hljs.highlightBlock(codeOutput);
    });
    
    codeInput.addEventListener('scroll', (event) => {
      codeOutput.scrollTop = codeInput.scrollTop;
      codeOutput.scrollLeft = codeInput.scrollLeft;
    });
  
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
          if (entry.target === codeInput) {
              // match the height and width of the output area to the input area
              codeOutput.style.height = (codeInput.offsetHeight) + 'px';
              codeOutput.style.width = (codeInput.offsetWidth) + 'px';
  
              // provide some padding in the output area to allow for any scroll bars or other decoration in the input area
              // offsetWidth/offsetHeight is the full width/height of the element
              // clientWidth/clientHeight is the width/height inside any decoration, like a scrollbar
              codeOutput.style.paddingRight = (codeInput.offsetWidth - codeInput.clientWidth) + 'px';
  
              codeOutput.style.paddingBottom = (codeInput.offsetHeight - codeInput.clientHeight) + 'px';
          }
      }
    });
  
    resizeObserver.observe(codeInput);
  },
  methods: {
    pollSensors() {
        let polling = false;
        console.log('start polling');
        while (true) {
          if (!polling) {
            polling = true;
            addCommandToQueue(function() {
              getInputValues(switch1Port,function(res){
                console.log(res);
                $('#switch1').text(res.pressed);
              });
            });
            addCommandToQueue(function() {
              getInputValues(switch2Port,function(res){
                console.log(res);
                $('#switch2').text(res.pressed);
              });
            });
            addCommandToQueue(function() {
              getInputValues(colourPort,function(res){
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
        pollSensors();
        let code = $('#code-input').val();
        eval(code);
    }
  },

  template: `
  <p>Code to execute</p>
  <div class="row">
    <div class="col col-8">
      <fieldset class="editor">
        <textarea id="code-input" aria-controls="code-highlighter" class="input" autocapitalize="off" spellcheck="false"></textarea>
        <output id="code-output" role="status" class="highlighted-output javascript"></output>
      </fieldset>
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