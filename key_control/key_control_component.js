import { ref } from 'vue'
import keyConfigs from './configs.js'
import SimplifiedCommands from '../nxt/simplified_commands.js'
import NXTConstants from '../nxt/config.js'

export default {
  setup() {
    const valueKeyMap = {
        38:'↑',40:'↓',37:'←',39:'→',32:'spacebar',65:'a',66:'b',67:'c',68:'d',69:'e',70:'f',71:'g',72:'h',73:'i',74:'j',75:'k',76:'l',77:'m',78:'n',79:'o',80:'p',81:'q',82:'r',83:'s',84:'t',85:'u',86:'v',87:'w',88:'x',89:'y',90:'z',49:'1',50:'2',51:'3',52:'4',53:'5',54:'6',55:'7',56:'8',57:'9',48:'0'
      };
    let selectedConfig = ref({name: "", instructions: "#", config: []})
    let selectedConfigName = ref("none")
    return { keyConfigs, selectedConfig, selectedConfigName, valueKeyMap }
  },
  props: { simpleCommands: {type: SimplifiedCommands, required: true}},
  methods: {
    onConfigChange(event) {
        for (const config of keyConfigs.keyConfigs) {
            if (this.selectedConfigName === config.name) {
                this.selectedConfig = config
                this.setKeysFromConfig(config.config)
            }
        }
    },
    setKeysFromConfig(config) {
        let pushing = [];
        let self = this;
        $('body').off();
        $('body').keyup(async function(event) {
            for (const keyConfig of config) {
                if (event.which == keyConfig.key) {
                    event.preventDefault();
                    pushing = pushing.filter(e => e !== event.which);
                    if (keyConfig.action === 'motora' || keyConfig.action === 'motorab' || keyConfig.action === 'motorac') {
                        await self.simpleCommands.stopMotor(NXTConstants.motors.PORT_A);
                    }
                    if (keyConfig.action === 'motorb' || keyConfig.action === 'motorab' || keyConfig.action === 'motorbc') {
                        await self.simpleCommands.stopMotor(NXTConstants.motors.PORT_B);
                    }
                    if (keyConfig.action === 'motorc' || keyConfig.action === 'motorac' || keyConfig.action === 'motorbc') {
                        await self.simpleCommands.stopMotor(NXTConstants.motors.PORT_C);
                    }
                }
            }
        });
    
        $('body').keydown(async function(event) {
            if (pushing.includes(event.which)) {
              event.preventDefault();
              return;
            }
        
            for (const keyConfig of config) {
                if (event.which == keyConfig.key) {
                    event.preventDefault();
                    pushing.push(event.which);
                    switch (keyConfig.action) {
                        case 'motora' :
                            await self.simpleCommands.turnMotorSpeed(NXTConstants.motors.PORT_A,keyConfig.speed,(keyConfig.direction === 'forward'));
                            break;
                        case 'motorb' :
                            await self.simpleCommands.turnMotorSpeed(NXTConstants.motors.PORT_B,keyConfig.speed,(keyConfig.direction === 'forward'));
                            break;
                        case 'motorc' :
                            await self.simpleCommands.turnMotorSpeed(NXTConstants.motors.PORT_C,keyConfig.speed,(keyConfig.direction === 'forward'));
                            break;
                        case 'motorab' :
                            await self.simpleCommands.turnMotorSpeed(NXTConstants.motors.PORT_A,keyConfig.speed,(keyConfig.direction === 'forward' || keyConfig.direction === 'forwardbackward'));
                            await self.simpleCommands.turnMotorSpeed(NXTConstants.motors.PORT_B,keyConfig.speed,(keyConfig.direction === 'forward' || keyConfig.direction === 'backwardforward'));
                            break;
                        case 'motorac' :
                            await self.simpleCommands.turnMotorSpeed(NXTConstants.motors.PORT_A,keyConfig.speed,(keyConfig.direction === 'forward' || keyConfig.direction === 'forwardbackward'));
                            await self.simpleCommands.turnMotorSpeed(NXTConstants.motors.PORT_C,keyConfig.speed,(keyConfig.direction === 'forward' || keyConfig.direction === 'backwardforward'));
                            break;
                        case 'motorbc' :
                            await self.simpleCommands.turnMotorSpeed(NXTConstants.motors.PORT_B,keyConfig.speed,(keyConfig.direction === 'forward' || keyConfig.direction === 'forwardbackward'));
                            await self.simpleCommands.turnMotorSpeed(NXTConstants.motors.PORT_C,keyConfig.speed,(keyConfig.direction === 'forward' || keyConfig.direction === 'backwardforward'));
                            break;
                    }
                }
            }
        });
      }
  },
  template: `
<div class="row">
  <div class="col col-md-6">
    <h3>Assign keys</h3>
    <label class="form-label" for="chooseConfig">Build Configuration</label>
    <select class="form-control" id="chooseConfig" @change="onConfigChange($event)" v-model="selectedConfigName">
      <option>none</option>
      <option v-for="item in keyConfigs.keyConfigs">
        {{ item.name }}
      </option>
    </select>
    
    
    <a v-if="selectedConfigName !== 'none'" :href="selectedConfig.instructions" target="_blank" class="my-4 d-block">Build Instructions</a>
    
    <div v-if="selectedConfigName !== 'none'" class="border p-2">
      <h4>Key Config</h4>
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