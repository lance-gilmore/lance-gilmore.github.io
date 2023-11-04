import { ref } from 'vue'
import keyConfigs from './configs.js'

export default {
  setup() {
    console.log(keyConfigs)
    let selectedConfig = ref({name: "", instructions: "#", config: []})
    let selectedConfigName = ref("none")
    return { NXTConstants, keyConfigs, selectedConfig, selectedConfigName }
  },
  methods: {
    onConfigChange(event) {
        console.log(event.target.value)
        console.log(this.selectedConfigName)
        for (const config of keyConfigs) {
            if (this.selectedConfigName === config.name) {
                this.selectedConfig = config
                console.log('config found')
            }
        }
    }
  },
  template: `
<div class="row">
  <div class="col col-md-6">
    <p>assign keys</p>
    <label class="form-label" for="chooseConfig">Configuration</label>
    <select class="form-control" id="chooseConfig" @change="onConfigChange($event)" v-model="selectedConfigName">
      <option>none</option>
      <option v-for="item in keyConfigs.keyConfigs">
          {{ item.name }}
      </option>
    </select>
    
    <label>
      <a href="{{ selectedConfig.instructions }}" id="configInstructions" target="_blank">Instructions</a>
    </label>

    <div>
      <p>Config</p>
      <div id="configKeys">
        <p v-for="({item}, index) in selectedConfig.config">
          {{ index }} {{ item.action }} {{ item.direction }} {{ item.speed }}
        </p>
      </div>
    </div>
    
  </div>
  
</div>
  `
}