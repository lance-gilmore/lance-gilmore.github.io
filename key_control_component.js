import { ref } from 'vue'
import keyConfigs from './configs.js'

export default {
  setup() {
    const valueKeyMap = {
        38:'↑',40:'↓',37:'←',39:'→',32:'spacebar',65:'a',66:'b',67:'c',68:'d',69:'e',70:'f',71:'g',72:'h',73:'i',74:'j',75:'k',76:'l',77:'m',78:'n',79:'o',80:'p',81:'q',82:'r',83:'s',84:'t',85:'u',86:'v',87:'w',88:'x',89:'y',90:'z',49:'1',50:'2',51:'3',52:'4',53:'5',54:'6',55:'7',56:'8',57:'9',48:'0'
      };
    let selectedConfig = ref({name: "", instructions: "#", config: []})
    let selectedConfigName = ref("none")
    return { NXTConstants, keyConfigs, selectedConfig, selectedConfigName, valueKeyMap }
  },
  methods: {
    onConfigChange(event) {
        for (const config of keyConfigs.keyConfigs) {
            if (this.selectedConfigName === config.name) {
                this.selectedConfig = config
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
      <a :href="selectedConfig.instructions" target="_blank">Instructions</a>
    </label>

    <div>
      <p>Config</p>
      <div>
        <p v-for="(item in selectedConfig.config">
          {{ valueKeyMap[item.key] }} {{ item.action }} {{ item.direction }} {{ item.speed }}
        </p>
      </div>
    </div>
    
  </div>
  
</div>
  `
}