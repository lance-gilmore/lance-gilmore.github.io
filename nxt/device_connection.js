
export default {
    //NXTPort: {},
    connectDeviceSerial() {
        return new Promise((resolve) => {
            if (!"serial" in navigator) {
                console.log('warning web serial not supported!');
            }
            
            const port = await navigator.serial.requestPort();
           // this.NXTPort = port;
            await port.open({ 
                baudRate: 9600, 
                dataBits: 8, 
                stopBits : 1, 
                parity: 'none',
                //  bufferSize: 
                flowControl: 'none'
            });
           // return port
            resolve(port)
        })

    },

    async readThePort(port) {
        while (port.readable) {
        const reader = port.readable.getReader();
  
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
    },

    async writeCommand(port, command) {
        console.log('sending:');
        console.log(command);
        const writer = port.writable.getWriter();
        await writer.write(command);
        // Allow the serial port to be closed later.
        writer.releaseLock();
    },

}