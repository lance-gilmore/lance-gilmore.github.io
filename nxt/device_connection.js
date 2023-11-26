
export default class {
    NXTPort

    constructor() {
        if (!"serial" in navigator) {
            console.log('warning web serial not supported!');
        }
        
        this.#connectDevice()
    }

    async #connectDevice() {
        const port = await navigator.serial.requestPort();
        
        await port.open({ 
            baudRate: 9600, 
            dataBits: 8, 
            stopBits : 1, 
            parity: 'none',
            //  bufferSize: 
            flowControl: 'none'
        });
        this.NXTPort = port;
    }

    async writeCommand(command) {
        //console.log('sending:');
        //console.log(command);
        const writer = this.NXTPort.writable.getWriter();
        await writer.write(command);
        // Allow the serial port to be closed later.
        writer.releaseLock();
    }

}