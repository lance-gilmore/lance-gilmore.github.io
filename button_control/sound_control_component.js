import { ref } from 'vue'

export default {
  
  setup() {
    return { }
  },
  methods: {
    async beepHorn() {
        await simpleBeep();
    }
  },
  template: `
    <button class="btn btn-secondary" type="button" @click="beepHorn">horn</button>
  `
}