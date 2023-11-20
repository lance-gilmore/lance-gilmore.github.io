import NXT from './nxt.js'
import NXTConstants from './config.js'

export default class {

    NXTConnection
    reader

    constructor(connection, reader) {
        this.NXTConnection = connection
        this.reader = reader
    }

    async initUltrasonicSensor(ultrasonicPort) {
        await setInputModeUltrasonic(ultrasonicPort,async function(res){
          let data = [
          0,
          15,
          ultrasonicPort,
          2,
          1,
          1,
          66
          ];
          await this.sendMessage(data);
        });
        //await lsWrite(ultrasonicPort,[65,2],[],async function(res){
        // 0x00, 0x0F, port, 0x02, 0x01, 0x02, 0x42
        
       // await lsWrite(ultrasonicPort,[66,2],[],async function(res){
          
       //   await lsGetStatus(ultrasonicPort,async function(res){
            
       //     await lsGetStatus(ultrasonicPort,function(res){
              
       //     });
       //   });
       // });
        
      }

    async runMotorCommand(motorPort,motorPowerPercent,motorMode,motorRegulation,regulatedTurnRatio, motorRunState,tacholimit,resultCallback) {
        const reply = NXT.callbackCheck(resultCallback);
        let tachoBits = this.valToBinArray(tacholimit); // tacholimit 0,0,0,0 for running forever
        while (tachoBits.length < 4) {
            tachoBits.push(0);
        }
        let data = [
            reply,
            NXTConstants.commandTypes.SET_OUTPUT_STATE,
            motorPort,
            motorPowerPercent,
            motorMode,
            motorRegulation, // regulation mode byte 0 for idle
            regulatedTurnRatio, // turn ratio
            motorRunState
        ];
        data = data.concat(tachoBits);

        await this.sendMessage(data);
    }

    async getMotorstate(motorPort,resultCallback) {
        const data = [
            NXTConstants.getReply.yes,
            NXTConstants.commandTypes.GET_OUTPUT_STATE,
            motorPort
        ];
        this.reader.addReplyListener(resultCallback);
        await this.sendMessage(data);
    }

    async lsGetStatus(sensorPort,resultCallback) {
        const data = [
            NXTConstants.getReply.yes,
            NXTConstants.commandTypes.LS_GET_STATUS,
            sensorPort
        ];
        this.reader.addReplyListener(resultCallback);
        await this.sendMessage(data);
    }

    async lsWrite(sensorPort,txData,rxData,resultCallback) {
        const reply = NXT.callbackCheck(resultCallback);
        let data = [
            reply,
            NXTConstants.commandTypes.LS_WRITE,
            sensorPort,
            txData.length,
            rxData.length
        ];
        data = data.concat(txData,rxData);
        await this.sendMessage(data);
    }

    async lsRead(sensorPort,resultCallback) {
        const data = [
            NXTConstants.getReply.yes,
            NXTConstants.commandTypes.LS_READ,
            sensorPort
        ];
        this.reader.addReplyListener(resultCallback);
        await this.sendMessage(data);
    }

    async setInputModeUltrasonic(ultrasonicPort,resultCallback) {
        const reply = NXT.callbackCheck(resultCallback);
        const data = [
            reply,
            NXTConstants.commandTypes.SET_INPUT_MODE,
            ultrasonicPort,
            NXTConstants.sensorTypes.LOWSPEED_9V,
            NXTConstants.sensorModes.RAW_MODE
        ];

        await this.sendMessage(data);
    }

    async setInputModeColour(lightColour,sensorPort,resultCallback) {
        const reply = NXT.callbackCheck(resultCallback);
        const data = [
            reply,
            NXTConstants.commandTypes.SET_INPUT_MODE,
            sensorPort,
            lightColour,
            NXTConstants.sensorModes.RAW_MODE
        ];
        await this.sendMessage(data);
    }

    async setInputModeSwitch(switchPort,resultCallback) {
        const reply = NXT.callbackCheck(resultCallback);
        const data = [
            reply,
            NXTConstants.commandTypes.SET_INPUT_MODE,
            switchPort,
            NXTConstants.sensorTypes.SWITCH,
            NXTConstants.sensorModes.BOOLEAN_MODE
        ];

        await this.sendMessage(data);
    }

    async getInputValues(sensorPort,resultCallback) {
        const data = [
            NXTConstants.getReply.yes,
            NXTConstants.commandTypes.GET_INPUT_VALUES,
            sensorPort,
        ];
        this.reader.addReplyListener(resultCallback);
        await this.sendMessage(data);
    }

    async setInputModeLight(active,resultCallback) {
        const reply = NXT.callbackCheck(resultCallback);
        const data = [
            reply,
            NXTConstants.commandTypes.SET_INPUT_MODE,
            NXTConstants.sensors.PORT_4,
            active,
            NXTConstants.sensorModes.PCT_FULL_SCALE_MODE
        ];

        await this.sendMessage(data);
    }

    async beep(frequencyHz,durationMilliseconds,resultCallback) {
        const reply = NXT.callbackCheck(resultCallback);
        const frequencyBin = this.valToBinArray(frequencyHz);
        const durationBin = this.valToBinArray(durationMilliseconds);
        const messageArray = [reply, NXTConstants.commandTypes.PLAY_TONE].concat(frequencyBin,durationBin);

        await this.sendMessage(messageArray);
    }

    async getVersion(resultCallback) {
        const messageArray = [
            NXTConstants.getReply.yesSystem,
            NXTConstants.commandTypes.GET_FIRMWARE_VERSION
        ];
        this.reader.addReplyListener(resultCallback);
        await this.sendMessage(messageArray);
    }

    async getBatteryLevel(resultCallback) {
        const messageArray = [NXTConstants.getReply.yes,NXTConstants.commandTypes.GET_BATTERY_LEVEL]; 
        this.reader.addReplyListener(resultCallback);
        await this.sendMessage(messageArray);
    }

    async getInfo(resultCallback) {
        const messageArray = [NXTConstants.getReply.yesSystem,NXTConstants.commandTypes.GET_DEVICE_INFO];
        this.reader.addReplyListener(resultCallback);
        await this.sendMessage(messageArray);
    }

    getInfoPromise() {
        const messageArray = [NXTConstants.getReply.yesSystem,NXTConstants.commandTypes.GET_DEVICE_INFO];
        const promiseRes = NXT.addReplyPromise();
        this.sendMessage(messageArray);
        return promiseRes
    }

    async sendMessage(messageArray) {
        const lengthBits = this.getLengthBits(messageArray);
        const fullMessage = lengthBits.concat(messageArray);
        
        await this.NXTConnection.writeCommand(Uint8Array.from(fullMessage));
      }

      getLengthBits(messageArray) {
        let lengthBits = this.valToBinArray(messageArray.length);
        if (lengthBits.length < 2) {
          lengthBits.push(0);
        }
        return lengthBits;
      }

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
      }
}