export default {
    commandTypes: {
      START_PROGRAM:0,
      STOPP_ROGRAM:1,
      PLAY_SOUND_FILE:2,
      PLAY_TONE:3,
      SET_OUTPUT_STATE:4,
      SET_INPUT_MODE:5,
      GET_OUTPUT_STATE:6,
      GET_INPUT_VALUES:7,
      RESET_INPUT_SCALED_VALUES:8,
      MESSAGE_WRITE:9,
      RESET_MOTOR_POSITION:10,
      GET_BATTERY_LEVEL:11,
      STOP_SOUND_PLAYBACK:12,
      KEEP_ALIVE:13,
      LS_GET_STATUS:14,
      LS_WRITE:15,
      LS_READ:16,
      GET_CURRENT_PROGRAM_NAME:17,
      MESSAGE_READ:18,
      GET_FIRMWARE_VERSION:136,
      GET_DEVICE_INFO:155
    },
    motors: {PORT_A:0, PORT_B:1, PORT_C:2, ALL_PORTS:255},
    motorModes: {coast:0,motorOn:1,motorOnBreak:3,motorOnRegulated:5,motorOnBreakRegulated:7},
    motorRegulation: {none:0,speed:1,twoMotorsSync:2},
    motorRunState: {idle:0,rampUp:16,running:32,rampDown:64},
    sensors: {PORT_1:0, PORT_2:1, PORT_3:2, PORT_4:3},
    sensorTypes: {
      NO_SENSOR:0,
      SWITCH:1,
      TEMPERATURE:2,
      REFLECTION:3,
      ANGLE:4,
      LIGHT_ACTIVE:5,
      LIGHT_INACTIVE:6,
      SOUND_DB:7,
      SOUND_DBA:8,
      CUSTOM:9,
      LOWSPEED:10,
      LOWSPEED_9V:11,
      NO_OF_SENSOR_TYPES:12,//HIGHSPEED
      COLOR_FULL: 13,
      COLOR_RED: 14,
      COLOR_GREEN: 15,
      COLOR_BLUE: 16,
      COLOR_NONE: 17
    },
    sensorModes: {
      RAW_MODE:0,
      BOOLEAN_MODE:32,
      TRANSITION_CNT_MODE:64,
      PERIOD_COUNTER_MODE:96,
      PCT_FULL_SCALE_MODE:128,
      CELCIUS_MODE:160,
      FAHRENHEIT_MODE:192,
      ANGLE_STEPS_MODE:224,
      SLOPE_MASK:31,
      MODE_MASK:224
    },
    sensorFullColours: {1:'black',2:'blue',3:'green',4:'yellow',5:'red',6:'white'},
    getReply: {yes:0,no:128,yesSystem:1,noSystem:129,reply:2},
    reply: {
      errors:{
        0:'success',
        32:'Pending communication transaction in process',
        64:'Specified mailbox queue is empty',
        189:'Request failed (i.e. specified file not found)',
        190:'Unknown command opcode',
        191:'Insane packet',
        192:'Data contains out-of-range values',
        221:'Communication bus error',
        222:'No free memory in communication buffer',
        223:'Specified channel/connection is not valid',
        224:'Specified channel/connection not configured or busy',
        236:'No active program',
        237:'Illegal size specified',
        238:'Illegal mailbox queue ID specified',
        239:'Attempted to access invalid field of a structure',
        240:'Bad input or output specified',
        251:'Insufficient memory available',
        255:'Bad arguments'
      }
    }
  }