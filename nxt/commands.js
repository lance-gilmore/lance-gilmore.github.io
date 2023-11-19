import NXT from './nxt.js'
import NXTConstants from './config.js'

export default class {

    #NXTConnection

    constructor(connection) {
        this.#NXTConnection = connection
        console.log('commands constructed')
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
          await this.#NXTConnection.sendMessage(data);
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

        await this.#NXTConnection.sendMessage(data);
    }

    async getMotorstate(motorPort,resultCallback) {
        const data = [
            NXTConstants.getReply.yes,
            NXTConstants.commandTypes.GET_OUTPUT_STATE,
            motorPort
        ];
        this.#NXTConnection.addReplyListener(resultCallback);
        await this.#NXTConnection.sendMessage(data);
    }

    async lsGetStatus(sensorPort,resultCallback) {
        const data = [
            NXTConstants.getReply.yes,
            NXTConstants.commandTypes.LS_GET_STATUS,
            sensorPort
        ];
        this.#NXTConnection.addReplyListener(resultCallback);
        await this.#NXTConnection.sendMessage(data);
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
        await this.#NXTConnection.sendMessage(data);
    }

    async lsRead(sensorPort,resultCallback) {
        const data = [
            NXTConstants.getReply.yes,
            NXTConstants.commandTypes.LS_READ,
            sensorPort
        ];
        this.#NXTConnection.addReplyListener(resultCallback);
        await this.#NXTConnection.sendMessage(data);
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

        await this.#NXTConnection.sendMessage(data);
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
        console.log('setting colour')
        await this.#NXTConnection.sendMessage(data);
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

        await this.#NXTConnection.sendMessage(data);
    }

    async getInputValues(sensorPort,resultCallback) {
        const data = [
            NXTConstants.getReply.yes,
            NXTConstants.commandTypes.GET_INPUT_VALUES,
            sensorPort,
        ];
        this.#NXTConnection.addReplyListener(resultCallback);
        await this.#NXTConnection.sendMessage(data);
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

        await this.#NXTConnection.sendMessage(data);
    }

    async beep(frequencyHz,durationMilliseconds,resultCallback) {
        const reply = NXT.callbackCheck(resultCallback);
        const frequencyBin = NXT.valToBinArray(frequencyHz);
        const durationBin = NXT.valToBinArray(durationMilliseconds);
        const messageArray = [reply, NXTConstants.commandTypes.PLAY_TONE].concat(frequencyBin,durationBin);

        await this.#NXTConnection.sendMessage(messageArray);
    }

    async getVersion(resultCallback) {
        const messageArray = [
            NXTConstants.getReply.yesSystem,
            NXTConstants.commandTypes.GET_FIRMWARE_VERSION
        ];
        this.#NXTConnection.addReplyListener(resultCallback);
        await this.#NXTConnection.sendMessage(messageArray);
    }

    async getBatteryLevel(resultCallback) {
        const messageArray = [NXTConstants.getReply.yes,NXTConstants.commandTypes.GET_BATTERY_LEVEL]; 
        this.#NXTConnection.addReplyListener(resultCallback);
        await this.#NXTConnection.sendMessage(messageArray);
    }

    async getInfo(resultCallback) {
        const messageArray = [NXTConstants.getReply.yesSystem,NXTConstants.commandTypes.GET_DEVICE_INFO];
        this.#NXTConnection.addReplyListener(resultCallback);
        await this.#NXTConnection.sendMessage(messageArray);
    }

    getInfoPromise() {
        const messageArray = [NXTConstants.getReply.yesSystem,NXTConstants.commandTypes.GET_DEVICE_INFO];
        const promiseRes = NXT.addReplyPromise();
        this.#NXTConnection.sendMessage(messageArray);
        return promiseRes
    }
}