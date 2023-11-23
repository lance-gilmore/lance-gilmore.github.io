import NXTConstants from './config.js'

export default class {
    #connection
    #sensorReadings

    constructor(connection, sensorReadings) {
        this.#connection = connection
        this.#sensorReadings = sensorReadings
        this.#readThePort()
    }

    async #readThePort() {
      while (this.#connection.NXTPort.readable) {
        const reader = this.#connection.NXTPort.readable.getReader();
  
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
              this.#processResponse(value);
            }
          }
        } catch (error) {
            console.log('caught error');
          // TODO: Handle non-fatal read error.
        }
      }
      console.log('not reading...')
    }

    async #processResponse(message) {
        const length = this.#binArrayToVal([message[0],message[1]]);
        const getReply = this.#getPropertyFromVal(NXTConstants.getReply,message[2]);
        const commandReceived = this.#getPropertyFromVal(NXTConstants.commandTypes,message[3]);
        const status = NXTConstants.reply.errors[message[4]];
        console.log('message processed: length: '+length+' getReply: '+getReply+' commandReceived: '+commandReceived+' status: '+status);
        let reply = {'length':length,'commandReceived':commandReceived,'status':status};
        switch(commandReceived) {
          case 'GET_BATTERY_LEVEL':
            reply.batteryLevelMillivolts = this.#binArrayToVal(message.slice(5));
            reply.batteryPercent = Math.round(((reply.batteryLevelMillivolts - 6000) / (7800 - 6000)) * 100);
            // 6000 = very low, starting to loose function
            // 7782 = full
          break;
          case 'GET_FIRMWARE_VERSION':
            reply.firmwareVersion = message[8]+'.'+message[7];
            reply.protocolVersion = message[6]+'.'+message[5];
          break;
          case 'GET_DEVICE_INFO':
            const deviceInfo = this.#processDeviceInfo(message);
            reply = {...reply, ...deviceInfo};
          break;
          case 'GET_INPUT_VALUES':
            const inputValues = this.#processSensorValues(message);
            reply = {...reply, ...inputValues};
          break;
        }
        this.#triggerReplyEvents(reply);
    }


    #replyListeners = []
    #triggerReplyEvents(reply) {
        const listeners = this.#replyListeners;
        this.#replyListeners = [];
        if (listeners.length > 0) {
          listeners.forEach(replyListener => replyListener(reply));
        }
    }
    
    addReplyListener(func) {
        if (typeof func === 'function') {
            this.#replyListeners.push(func);
        }
    }

    #binArrayToVal(binArray) {
        let rejoined = '';
        for (let i=binArray.length;i>0;i--) {
            let toHex = binArray[i-1].toString(16);
            if (toHex.length === 1) {
                toHex = '0'+toHex;
            }
            rejoined += toHex;
        }
        return parseInt(rejoined,16);
      }

      #getPropertyFromVal(obj,val) {
        for(var name in obj) {
          if (obj[name] === val) {
            return name;
          }
        }
        return 'error cant find property in object';
      }

      #processDeviceInfo(message) {
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
      }

      #processSensorValues(message) {
        const inputPort = message[5];
        const valid = message[6];
        const calibrated = message[7]; // boolean
        const sensorType = this.#getPropertyFromVal(NXTConstants.sensorTypes,message[8]);
        const sensorMode = this.#getPropertyFromVal(NXTConstants.sensorModes,message[9]);
        const rawValue = this.#binArrayToVal(message.slice(10,11));
        const normalizedValue = this.#binArrayToVal(message.slice(12,13));
        const scaledValue = this.#binArrayToVal(message.slice(14,15));
        const calibratedValue = this.#binArrayToVal(message.slice(16,17));
        console.log('input value: port: '+inputPort+' valid: '+valid+' calibrated: '+calibrated+' sensorType: '+sensorType+
          ' mode: '+sensorMode+' raw: '+rawValue+' normalized: '+normalizedValue+' scaled: '+scaledValue+' calibrated: '+calibratedValue);
        let reply = {'port':inputPort,'valid':valid,'calibrated':calibrated,'sensorType':sensorType,'sensorMode':sensorMode,
          'rawValue':rawValue,'scaledValue':scaledValue,'calibratedValue':calibratedValue};
        switch (sensorType) {
          case 'SWITCH':
          const pressed = (scaledValue === 0) ? false : true;
          console.log('switch '+inputPort+' '+pressed);
          reply.pressed = pressed;
          this.#triggerSwitchEvents(reply)
          break;
          case 'COLOR_FULL':
          case 'COLOR_NONE':
          const colour = NXTConstants.sensorFullColours[scaledValue];
          console.log('colour: '+colour);
          reply.colour = colour;
          this.#triggerColourEvents(reply)
          break;
        }
    }

    #continuousSwitchListeners = []
    #triggerSwitchEvents(reply) {
        if (reply.port === 0) {
            this.#sensorReadings.switch1 = reply.pressed
        } else {
            this.#sensorReadings.switch2 = reply.pressed
        }

        if (this.#continuousSwitchListeners.length > 0) {
            this.#continuousSwitchListeners.forEach(replyListener => replyListener(reply));
        }
    }
    
    addSwitchListener(func) {
        this.#continuousSwitchListeners.push(func);
    }

    #continuousColourListeners = []
    #triggerColourEvents(reply) {
        this.#sensorReadings.colour = reply

        if (this.#continuousColourListeners.length > 0) {
            this.#continuousColourListeners.forEach(replyListener => replyListener(reply));
        }
    }
    
    addColourListener(func) {
        this.#continuousColourListeners.push(func);
    }

}