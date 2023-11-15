
export default class {
    #NXTPort = {}

    constructor() {
        if (!"serial" in navigator) {
            console.log('warning web serial not supported!');
        }
        
        this.#connectDevice()
    }

    async #connectDevice() {
      const port = await navigator.serial.requestPort();
        this.#NXTPort = port;
        await port.open({ 
            baudRate: 9600, 
            dataBits: 8, 
            stopBits : 1, 
            parity: 'none',
            //  bufferSize: 
            flowControl: 'none'
        });
    }

    async readThePort() {
        while (this.#NXTPort.readable) {
        const reader = this.#NXTPort.readable.getReader();
  
        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) {
              console.log('reader done');
              // Allow the serial port to be closed later.
              reader.releaseLock();
              break;
            }
            if (value) {
              console.log('received:');
              console.log(value);
              processResponse(value);
            }
          }
        } catch (error) {
            console.log('caught error');
          // TODO: Handle non-fatal read error.
        }
      }
    }

    async writeCommand(command) {
        console.log('sending:');
        console.log(command);
        const writer = this.#NXTPort.writable.getWriter();
        await writer.write(command);
        // Allow the serial port to be closed later.
        writer.releaseLock();
    }

}