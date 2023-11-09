import NXTConstants from './config.js'

export default {
  async processResponse(message) {
    const length = binArrayToVal([message[0],message[1]]);
    const getReply = getPropertyFromVal(NXTConstants.getReply,message[2]);
    const commandReceived = getPropertyFromVal(NXTConstants.commandTypes,message[3]);
    const status = NXTConstants.reply.errors[message[4]];
    console.log('message processed: length: '+length+' getReply: '+getReply+' commandReceived: '+commandReceived+' status: '+status);
    let reply = {'length':length,'commandReceived':commandReceived,'status':status};
    switch(commandReceived) {
      case 'GET_BATTERY_LEVEL':
        reply.batteryLevelMillivolts = binArrayToVal(message.slice(5));
        reply.batteryPercent = Math.round(((reply.batteryLevelMillivolts - 6000) / (7800 - 6000)) * 100);
        // 6000 = very low, starting to loose function
        // 7782 = full
      break;
      case 'GET_FIRMWARE_VERSION':
        reply.firmwareVersion = message[8]+'.'+message[7];
        reply.protocolVersion = message[6]+'.'+message[5];
      break;
      case 'GET_DEVICE_INFO':
        const deviceInfo = processDeviceInfo(message);
        reply = {...reply, ...deviceInfo};
      break;
      case 'GET_INPUT_VALUES':
        const inputValues = processSensorValues(message);
        reply = {...reply, ...inputValues};
      break;
    }
    triggerReplyEvents(reply);
  },
  
   processDeviceInfo(message) {
    let deviceName = '';
    for (let i=5; i<20;i++) {
      if (message[i] != 0) {
        deviceName += String.fromCharCode(message[i]);
      }
    }
    let bluetoothAddress = '';
    for (let i=21; i<26;i++) {
      bluetoothAddress += message[i].toString(16)+':';
    }
    return {'deviceName': deviceName,'bluetoothAddress':bluetoothAddress};
  },
  
   processSensorValues(message) {
    const inputPort = message[5];
    const valid = message[6];
    const calibrated = message[7]; // boolean
    const sensorType = getPropertyFromVal(NXTConstants.sensorTypes,message[8]);
    const sensorMode = getPropertyFromVal(NXTConstants.sensorModes,message[9]);
    const rawValue = binArrayToVal(message.slice(10,11));
    const normalizedValue = binArrayToVal(message.slice(12,13));
    const scaledValue = binArrayToVal(message.slice(14,15));
    const calibratedValue = binArrayToVal(message.slice(16,17));
    console.log('input value: port: '+inputPort+' valid: '+valid+' calibrated: '+calibrated+' sensorType: '+sensorType+
      ' mode: '+sensorMode+' raw: '+rawValue+' normalized: '+normalizedValue+' scaled: '+scaledValue+' calibrated: '+calibratedValue);
    let reply = {'port':inputPort,'valid':valid,'calibrated':calibrated,'sensorType':sensorType,'sensorMode':sensorMode,
      'rawValue':rawValue,'scaledValue':scaledValue,'calibratedValue':calibratedValue};
    switch (sensorType) {
      case 'SWITCH':
      const pressed = (scaledValue === 0) ? false : true;
      console.log('switch '+inputPort+' '+pressed);
      reply.pressed = pressed;
      break;
      case 'COLOR_FULL':
      const colour = NXTConstants.sensorFullColours[scaledValue];
      console.log('colour: '+colour);
      reply.colour = colour;
      break;
    }
    
    return reply;
  },
  
   NXTPort: {},
  async connectDeviceSerial() {
    if (!"serial" in navigator) {
      console.log('warning web serial not supported!');
    }
    
    const port = await navigator.serial.requestPort();
    this.NXTPort = port;
    await port.open({ 
      baudRate: 9600, 
      dataBits: 8, 
      stopBits : 1, 
      parity: 'none',
    //  bufferSize: 
      flowControl: 'none'
       });
       
    
    this.readThePort(port);
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
  
  /////// command functions
  

  
  async sendMessage(messageArray) {
    const lengthBits = this.getLengthBits(messageArray);
    const fullMessage = lengthBits.concat(messageArray);
    
    await this.writeCommand(this.NXTPort,Uint8Array.from(fullMessage));
  },
  
  async writeCommand(port, command) {
    console.log('sending:');
    console.log(command);
    const writer = port.writable.getWriter();
    await writer.write(command);
    // Allow the serial port to be closed later.
    writer.releaseLock();
  },
  
  ////////////////////// helper functions
  
  callbackCheck(resultCallback) {
    if (resultCallback !== undefined) {
      this.addReplyListener(resultCallback);
      return NXTConstants.getReply.yes;
    }
    return NXTConstants.getReply.no;
  },
  
   replyListeners: [],
   triggerReplyEvents(reply) {
    const listeners = replyListeners;
    this.replyListeners = [];
    if (listeners.length > 0) {
      listeners.forEach(replyListener => replyListener(reply));
    }
  },
  
  addReplyListener(func) {
    this.replyListeners.push(func);
  },
  
  getLengthBits(messageArray) {
    let lengthBits = this.valToBinArray(messageArray.length);
    if (lengthBits.length < 2) {
      lengthBits.push(0);
    }
    return lengthBits;
  },

  binArrayToVal(binArray) {
    let rejoined = '';
    for (let i=binArray.length;i>0;i--) {
        let toHex = binArray[i-1].toString(16);
        if (toHex.length === 1) {
            toHex = '0'+toHex;
        }
        rejoined += toHex;
    }
    return parseInt(rejoined,16);
  },

  valToBinArray(val) {
    let hex = val.toString(16);
    let parts = [];
    let even = false;
    for (let i=hex.length-1; i>-1;i--) {
        if (even) {
            parts.push(parseInt(hex.substr(i,i+1),16));
        }
        if (i===0 && !even) {
            parts.push(parseInt(hex.substr(0,1),16));
        }
        even = !even;
    }
    return parts;
  },
  
  getPropertyFromVal(obj,val) {
    for(var name in obj) {
      if (obj[name] === val) {
        return name;
      }
    }
    return 'error cant find property in object';
  },

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}