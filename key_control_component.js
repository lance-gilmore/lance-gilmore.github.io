import { ref } from 'vue'

export default {
  setup() {
    return { NXTConstants }
  },

  template: `
<div class="row">
  <div class="col col-md-6">
    <p>assign keys</p>
    <label class="form-label" for="chooseConfig">Configuration</label>
      <select class="form-control" id="chooseConfig">
        <option>none</option>
      </select>
    
    <label>
      <a href="#" id="configInstructions" target="_blank">Instructions</a>
    </label>

    <div>
      <p>Config</p>
      <div id="configKeys"></div>
    </div>
    
  </div>
  
</div>
  `
}