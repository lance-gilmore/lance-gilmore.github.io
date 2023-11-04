import { ref } from 'vue'
import keyConfigs from './configs.js'

export default {
  setup() {
    console.log(keyConfigs)
    return { NXTConstants, keyConfigs }
  },
  methods: {

  },
  template: `
<div class="row">
  <div class="col col-md-6">
    <p>assign keys</p>
    <label class="form-label" for="chooseConfig">Configuration</label>
      <select class="form-control" id="chooseConfig">
        <option>none</option>
        <option v-for="item in keyConfigs">
            {{ item.name }}
        </option>
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