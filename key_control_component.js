import { ref } from 'vue'
import keyConfigs from './configs.js'

export default {
  setup() {
    let selectedConfig = ref({name: "none", instructions: "#", config: [{key:38,action:'motorbc',direction:'forward',speed:100}]})
    let selectedConfigName = ref("none")
    return { NXTConstants, keyConfigs, selectedConfig, selectedConfigName }
  },
  methods: {
    onConfigChange(event) {
        console.log(this.selectedConfigName)
        for (const config of keyConfigs.keyConfigs) {
            if (this.selectedConfigName === config.name) {
                this.selectedConfig = config
                console.log(config)
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
      <a href="{{ selectedConfig.instructions }}" target="_blank">Instructions</a>
    </label>

    <div>
      <p>Config</p>
      <div>
        <p v-for="(item in selectedConfig.config">
          {{ item.key }} {{ item.action }} {{ item.direction }} {{ item.speed }}
        </p>
      </div>
    </div>
    
  </div>
  
</div>
  `
}