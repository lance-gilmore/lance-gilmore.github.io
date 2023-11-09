import NXT from './nxt.js'

export default {
    private commandQueue: [],
    async addCommandToQueue(command) {
      this.commandQueue.push(command);
    },
    
    async runCommandQueue() {
      let free = true;
      while (true) {
        if (free && this.commandQueue.length > 0) {
          free = false;
          const command = this.commandQueue.shift();
          NXT.addReplyListener(function(){
            free = true;
          });
          await command();
        }
        await this.sleep(10);
      }
    },

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}