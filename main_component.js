import { ref } from 'vue'
import NXTConnection from './nxt/device_connection.js'
import ConnectedComponent from './connected_component.js'

export default {
    components: {
        ConnectedComponent
      },
  setup() {
    const deviceConnected  = ref(false)
    const connection = {}
    
    return { deviceConnected, connection }
  },
  methods: {
    async connectNxt() {
      this.connection = await new NXTConnection;
      let that = this
      let refreshIntervalId = setInterval(function(){
        if (that.connection.NXTPort !== undefined) {
          that.deviceConnected = true
          clearInterval(refreshIntervalId);
        }
      },100);

    }
  },

  template: `
  <div v-if="!deviceConnected">
    <button class="btn btn-primary" type="button" id="connectDeviceBtn" @click="connectNxt">connect</button>
    <p>Ubuntu serial connect:
    <ul>
    <li>in terminal:</li>
    <li>sudo adduser lance dialout (then restart machine)</li>
    <li>rfcomm bind /dev/rfcomm0 00:16:53:0D:F6:08 1</li>
    <li>test/complete connection with:</li>
    <li>sudo l2ping 00:16:53:0D:F6:08</li>
    <li>should be able to connect from chrome now (may need to change access on rfcomm so you dont have to run command as sudo)</li>
    </ul>
    </p>
    <a href="https://github.com/lance-gilmore/lance-gilmore.github.io">github repo</a>
  </div>

<div v-if="deviceConnected">
  <ConnectedComponent :connection="connection" />
</div>
  `
}