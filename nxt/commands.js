import NXT from './nxt.js'

export default {
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
          await NXT.sendMessage(data);
        });
        //await lsWrite(ultrasonicPort,[65,2],[],async function(res){
        // 0x00, 0x0F, port, 0x02, 0x01, 0x02, 0x42
        
       // await lsWrite(ultrasonicPort,[66,2],[],async function(res){
          
       //   await lsGetStatus(ultrasonicPort,async function(res){
            
       //     await lsGetStatus(ultrasonicPort,function(res){
              
       //     });
       //   });
       // });
        
      },

    async runMotorCommand(motorPort,motorPowerPercent,motorMode,motorRegulation,regulatedTurnRatio, motorRunState,tacholimit,resultCallback) {
        const reply = NXT.callbackCheck(resultCallback);
        let tachoBits = NXT.valToBinArray(tacholimit); // tacholimit 0,0,0,0 for running forever
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

        await NXT.sendMessage(data);
    },

    async getMotorstate(motorPort,resultCallback) {
        const data = [
            NXTConstants.getReply.yes,
            NXTConstants.commandTypes.GET_OUTPUT_STATE,
            motorPort
        ];
        NXT.addReplyListener(resultCallback);
        await NXT.sendMessage(data);
    },

    async lsGetStatus(sensorPort,resultCallback) {
        const data = [
            NXTConstants.getReply.yes,
            NXTConstants.commandTypes.LS_GET_STATUS,
            sensorPort
        ];
        NXT.addReplyListener(resultCallback);
        await NXT.sendMessage(data);
    },

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
        await NXT.sendMessage(data);
    },

    async lsRead(sensorPort,resultCallback) {
        const data = [
            NXTConstants.getReply.yes,
            NXTConstants.commandTypes.LS_READ,
            sensorPort
        ];
        NXT.addReplyListener(resultCallback);
        await NXT.sendMessage(data);
    },

    async setInputModeUltrasonic(ultrasonicPort,resultCallback) {
        const reply = NXT.callbackCheck(resultCallback);
        const data = [
            reply,
            NXTConstants.commandTypes.SET_INPUT_MODE,
            ultrasonicPort,
            NXTConstants.sensorTypes.LOWSPEED_9V,
            NXTConstants.sensorModes.RAW_MODE
        ];

        await NXT.sendMessage(data);
    },

    async setInputModeColour(lightColour,sensorPort,resultCallback) {
        const reply = NXT.callbackCheck(resultCallback);
        const data = [
            reply,
            NXTConstants.commandTypes.SET_INPUT_MODE,
            sensorPort,
            lightColour,
            NXTConstants.sensorModes.RAW_MODE
        ];

        await NXT.sendMessage(data);
    },

    async setInputModeSwitch(switchPort,resultCallback) {
        const reply = NXT.callbackCheck(resultCallback);
        const data = [
            reply,
            NXTConstants.commandTypes.SET_INPUT_MODE,
            switchPort,
            NXTConstants.sensorTypes.SWITCH,
            NXTConstants.sensorModes.BOOLEAN_MODE
        ];

        await NXT.sendMessage(data);
    },

    async getInputValues(sensorPort,resultCallback) {
        const data = [
            NXTConstants.getReply.yes,
            NXTConstants.commandTypes.GET_INPUT_VALUES,
            sensorPort,
        ];
        NXT.addReplyListener(resultCallback);
        await NXT.sendMessage(data);
    },

    async setInputModeLight(active,resultCallback) {
        const reply = NXT.callbackCheck(resultCallback);
        const data = [
            reply,
            NXTConstants.commandTypes.SET_INPUT_MODE,
            NXTConstants.sensors.PORT_4,
            active,
            NXTConstants.sensorModes.PCT_FULL_SCALE_MODE
        ];

        await NXT.sendMessage(data);
    },

    async beep(frequencyHz,durationMilliseconds,resultCallback) {
        const reply = NXT.callbackCheck(resultCallback);
        const frequencyBin = this.valToBinArray(frequencyHz);
        const durationBin = this.valToBinArray(durationMilliseconds);
        const messageArray = [reply, NXTConstants.commandTypes.PLAY_TONE].concat(frequencyBin,durationBin);

        await NXT.sendMessage(messageArray);
    },

    async getVersion(resultCallback) {
        const messageArray = [
            NXTConstants.getReply.yesSystem,
            NXTConstants.commandTypes.GET_FIRMWARE_VERSION
        ];
        NXT.addReplyListener(resultCallback);
        await NXT.sendMessage(messageArray);
    },

    async getBatteryLevel(resultCallback) {
        const messageArray = [NXTConstants.getReply.yes,NXTConstants.commandTypes.GET_BATTERY_LEVEL]; 
        NXT.addReplyListener(resultCallback);
        await NXT.sendMessage(messageArray);
    },

    async getInfo(resultCallback) {
        const messageArray = [NXTConstants.getReply.yesSystem,NXTConstants.commandTypes.GET_DEVICE_INFO];
        NXT.addReplyListener(resultCallback);
        await NXT.sendMessage(messageArray);
    },
}