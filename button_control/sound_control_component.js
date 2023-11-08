import NxtCommands from '../nxt/simplified_commands.js'

export default {
  
  setup() {
    return { }
  },
  methods: {
    async beepHorn() {
        await NxtCommands.simpleBeep();
    }
  },
  template: `
<div>
    <h3>Sound</h3>
    <button class="btn btn-secondary" type="button" @click="beepHorn">horn</button>
</div>
  `
}