

  async function processResponse(message) {
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
  }
  
  function processDeviceInfo(message) {
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
  
  function processSensorValues(message) {
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
  }
  
  async function initUltrasonicSensor(ultrasonicPort) {
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
      await sendMessage(data);
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
  
  let NXTPort = {};
  async function connectDeviceSerial() {
    if (!"serial" in navigator) {
      console.log('warning web serial not supported!');
    }
    
    const port = await navigator.serial.requestPort();
    NXTPort = port;
    await port.open({ 
      baudRate: 9600, 
      dataBits: 8, 
      stopBits : 1, 
      parity: 'none',
    //  bufferSize: 
      flowControl: 'none'
       });
       
    
    readThePort(port);
  }
  
  async function readThePort(port) {
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
  }
  
  /////// simplified commands
  
  async function simpleBeep() {
    await beep(523,500,false);
  }

  async function stopMotor(motorPort) {
    const motorPowerPercent = 0; // 0 - 100 forwards 255 - 156 backwards (156 = 100% backwards)
    const regulatedTurnRatio = 0; // 0 - 100 forwards 255 - 156 backwards (156 = 100% backwards)
    await runMotorCommand(motorPort,motorPowerPercent,
      NXTConstants.motorModes.motorOnBreakRegulated,NXTConstants.motorRegulation.none,
      regulatedTurnRatio,NXTConstants.motorRunState.running,0);
  }
  
  async function forwardMotor(motorPort) {
    const motorPowerPercent = 100; // 0 - 100 forwards 255 - 156 backwards (156 = 100% backwards)
    const regulatedTurnRatio = 0; // 0 - 100 forwards 255 - 156 backwards (156 = 100% backwards)
    await runMotorCommand(motorPort,motorPowerPercent,
      NXTConstants.motorModes.motorOnBreakRegulated,NXTConstants.motorRegulation.none,
      regulatedTurnRatio,NXTConstants.motorRunState.running,0);
  }
  
  async function backwardMotor(motorPort) {
    const motorPowerPercent = 156; // 0 - 100 forwards 255 - 156 backwards (156 = 100% backwards)
    const regulatedTurnRatio = 0; // 0 - 100 forwards 255 - 156 backwards (156 = 100% backwards)
    await runMotorCommand(motorPort,motorPowerPercent,
      NXTConstants.motorModes.motorOnBreakRegulated,NXTConstants.motorRegulation.none,
      regulatedTurnRatio,NXTConstants.motorRunState.running,0);
  }
  
  async function motorAOneRevolution() {
    await turnMotorDegrees(NXTConstants.motors.PORT_A,360,true);
  }
  
  async function turnMotorSpeed(motorPort,speed,forward) {
    const motorPowerPercent = (forward) ? speed : 256 - speed; // 0 - 100 forwards 255 - 156 backwards (156 = 100% backwards)
    const regulatedTurnRatio = 0; // 0 - 100 forwards 255 - 156 backwards (156 = 100% backwards)
    await runMotorCommand(motorPort,motorPowerPercent,
      NXTConstants.motorModes.motorOnBreakRegulated,NXTConstants.motorRegulation.none,
      regulatedTurnRatio,NXTConstants.motorRunState.running,0);
  }
  
  async function turnMotorDegrees(motorPort,degrees,forward) {
    const motorPowerPercent = (forward) ? 25 : 225; // 0 - 100 forwards 255 - 156 backwards (156 = 100% backwards)
    const regulatedTurnRatio = 0; // 0 - 100 forwards 255 - 156 backwards (156 = 100% backwards)
    await runMotorCommand(motorPort,motorPowerPercent,
      NXTConstants.motorModes.motorOnBreakRegulated,NXTConstants.motorRegulation.none,
      regulatedTurnRatio,NXTConstants.motorRunState.running,degrees);
  }
  
  /////// command functions
  
  async function runMotorCommand(motorPort,motorPowerPercent,motorMode,motorRegulation,regulatedTurnRatio,
                                 motorRunState,tacholimit,resultCallback) {
    const reply = callbackCheck(resultCallback);
    let tachoBits = valToBinArray(tacholimit); // tacholimit 0,0,0,0 for running forever
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
    
    await sendMessage(data);
  }
  
    async function getMotorstate(motorPort,resultCallback) {
    const data = [
        NXTConstants.getReply.yes,
        NXTConstants.commandTypes.GET_OUTPUT_STATE,
        motorPort
      ];
    addReplyListener(resultCallback);
    await sendMessage(data);
  }
  
  async function lsGetStatus(sensorPort,resultCallback) {
    const data = [
        NXTConstants.getReply.yes,
        NXTConstants.commandTypes.LS_GET_STATUS,
        sensorPort
      ];
    addReplyListener(resultCallback);
    await sendMessage(data);
  }
  
  async function lsWrite(sensorPort,txData,rxData,resultCallback) {
    const reply = callbackCheck(resultCallback);
    let data = [
        reply,
        NXTConstants.commandTypes.LS_WRITE,
        sensorPort,
        txData.length,
        rxData.length
      ];
    data = data.concat(txData,rxData);
    await sendMessage(data);
  }
  
  async function lsRead(sensorPort,resultCallback) {
    const data = [
        NXTConstants.getReply.yes,
        NXTConstants.commandTypes.LS_READ,
        sensorPort
      ];
    addReplyListener(resultCallback);
    await sendMessage(data);
  }
  
  async function setInputModeUltrasonic(ultrasonicPort,resultCallback) {
    const reply = callbackCheck(resultCallback);
    const data = [
        reply,
        NXTConstants.commandTypes.SET_INPUT_MODE,
        ultrasonicPort,
        NXTConstants.sensorTypes.LOWSPEED_9V,
        NXTConstants.sensorModes.RAW_MODE
      ];
    
    await sendMessage(data);
  }
  
  async function setInputModeColour(lightColour,sensorPort,resultCallback) {
    const reply = callbackCheck(resultCallback);
    const data = [
        reply,
        NXTConstants.commandTypes.SET_INPUT_MODE,
        sensorPort,
        lightColour,
        NXTConstants.sensorModes.RAW_MODE
      ];
    
    await sendMessage(data);
  }
  
  async function setInputModeSwitch(switchPort,resultCallback) {
    const reply = callbackCheck(resultCallback);
    const data = [
        reply,
        NXTConstants.commandTypes.SET_INPUT_MODE,
        switchPort,
        NXTConstants.sensorTypes.SWITCH,
        NXTConstants.sensorModes.BOOLEAN_MODE
      ];
    
    await sendMessage(data);
  }
  
  async function getInputValues(sensorPort,resultCallback) {
    const data = [
        NXTConstants.getReply.yes,
        NXTConstants.commandTypes.GET_INPUT_VALUES,
        sensorPort,
      ];
    addReplyListener(resultCallback);
    await sendMessage(data);
  }
  
  async function setInputModeLight(active,resultCallback) {
    const reply = callbackCheck(resultCallback);
    const data = [
        reply,
        NXTConstants.commandTypes.SET_INPUT_MODE,
        NXTConstants.sensors.PORT_4,
        active,
        NXTConstants.sensorModes.PCT_FULL_SCALE_MODE
      ];
    
    await sendMessage(data);
  }
  
  async function beep(frequencyHz,durationMilliseconds,resultCallback) {
    const reply = callbackCheck(resultCallback);
    const frequencyBin = valToBinArray(frequencyHz);
    const durationBin = valToBinArray(durationMilliseconds);
    const messageArray = [reply, NXTConstants.commandTypes.PLAY_TONE].concat(frequencyBin,durationBin);
    
    await sendMessage(messageArray);
  }
  
  async function getVersion(resultCallback) {
    const messageArray = [
      NXTConstants.getReply.yesSystem,
      NXTConstants.commandTypes.GET_FIRMWARE_VERSION
    ];
    addReplyListener(resultCallback);
    await sendMessage(messageArray);
  }
  
  async function getBatteryLevel(resultCallback) {
    const messageArray = [NXTConstants.getReply.yes,NXTConstants.commandTypes.GET_BATTERY_LEVEL]; 
    addReplyListener(resultCallback);
    await sendMessage(messageArray);
  }
  
  async function getInfo(resultCallback) {
    const messageArray = [NXTConstants.getReply.yesSystem,NXTConstants.commandTypes.GET_DEVICE_INFO];
    addReplyListener(resultCallback);
    await sendMessage(messageArray);
  }
  
  async function sendMessage(messageArray) {
    const lengthBits = getLengthBits(messageArray);
    const fullMessage = lengthBits.concat(messageArray);
    
    await writeCommand(NXTPort,Uint8Array.from(fullMessage));
  }
  
  async function writeCommand(port, command) {
    console.log('sending:');
    console.log(command);
    const writer = port.writable.getWriter();
    await writer.write(command);
    // Allow the serial port to be closed later.
    writer.releaseLock();
  }
  
  ////////////////////// helper functions
  
  
  let commandQueue = [];
  async function addCommandToQueue(command) {
    commandQueue.push(command);
  }
  
  async function runCommandQueue() {
    let free = true;
    while (true) {
      if (free && commandQueue.length > 0) {
        free = false;
        const command = commandQueue.shift();
        addReplyListener(function(){
          free = true;
        });
        await command();
      }
      await sleep(10);
    }
  }
  
  function callbackCheck(resultCallback) {
    if (resultCallback !== undefined) {
      addReplyListener(resultCallback);
      return NXTConstants.getReply.yes;
    }
    return NXTConstants.getReply.no;
  }
  
  let replyListeners = [];
  function triggerReplyEvents(reply) {
    const listeners = replyListeners;
    replyListeners = [];
    if (listeners.length > 0) {
      listeners.forEach(replyListener => replyListener(reply));
    }
  }
  
  function addReplyListener(func) {
    replyListeners.push(func);
  }
  
  function getLengthBits(messageArray) {
    let lengthBits = valToBinArray(messageArray.length);
    if (lengthBits.length < 2) {
      lengthBits.push(0);
    }
    return lengthBits;
  }
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function binArrayToVal(binArray) {
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

  function valToBinArray(val) {
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
  
  function getPropertyFromVal(obj,val) {
    for(var name in obj) {
      if (obj[name] === val) {
        return name;
      }
    }
    return 'error cant find property in object';
  }
