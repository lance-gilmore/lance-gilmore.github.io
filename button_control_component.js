import { ref } from 'vue'

export default {
  
  setup() {
    // const changeLight = async function (colour) {
    //     await setInputModeColour(colour,colourPort);
    // }

    const beepHorn = async function () {
        await simpleBeep();
    }

    const motorsForwards = async function (motor1, motor2) {
        await forwardMotor(motor1);
        if(typeof motor2 !== "undefined") {
            await forwardMotor(motor2);
        }
    }

    const motorsBackwards = async function (motor1, motor2) {
        await backwardMotor(motor1);
        if(typeof motor2 !== "undefined") {
            await backwardMotor(motor2);
        }
    }

    const motorsForwardsBackwards = async function (motor1, motor2) {
        await forwardMotor(motor1);
        await backwardMotor(motor2);
    }

    const motorsStop = async function (motor1, motor2) {
        await stopMotor(motor1);
        if(typeof motor2 !== "undefined") {
            await stopMotor(motor2);
        }
    }
    
    return { NXTConstants, beepHorn, motorsForwards, motorsBackwards, motorsForwardsBackwards, motorsStop }
  },
  methods: {
    async changeLight(colour) {
        await setInputModeColour(colour,colourPort);
    }
  },
  template: `
  <div class="row text-center">
  <div class="controlls col">
    <p>BC</p>
    <div class="row">
      <div class="col mx-auto text-center mb-1">
        <button class="btn btn-secondary" type="button" @mousedown="motorsForwards(NXTConstants.motors.PORT_B, NXTConstants.motors.PORT_C)" @mouseup="motorsStop(NXTConstants.motors.PORT_B, NXTConstants.motors.PORT_C)">↑</button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button class="btn btn-secondary" type="button" id="leftBtn" @mousedown="motorsForwardsBackwards(NXTConstants.motors.PORT_B, NXTConstants.motors.PORT_C)" @mouseup="motorsStop(NXTConstants.motors.PORT_B, NXTConstants.motors.PORT_C)">←</button>
        <button class="btn btn-secondary" type="button" id="backwardsBtn" @mousedown="motorsBackwards(NXTConstants.motors.PORT_B, NXTConstants.motors.PORT_C)" @mouseup="motorsStop(NXTConstants.motors.PORT_B, NXTConstants.motors.PORT_C)">↓</button>
        <button class="btn btn-secondary" type="button" id="rightBtn" @mousedown="motorsForwardsBackwards(NXTConstants.motors.PORT_C, NXTConstants.motors.PORT_B)" @mouseup="motorsStop(NXTConstants.motors.PORT_B, NXTConstants.motors.PORT_C)">→</button>
      </div>
    </div>
  </div>
  
  <div class="col controllsA">
    <p>A</p>
    <div class="row">
      <div class="col mx-auto text-center mb-1">
        <button class="btn btn-secondary" type="button" id="forwardABtn" @mousedown="motorsForwards(NXTConstants.motors.PORT_A)" @mouseup="motorsStop(NXTConstants.motors.PORT_A)">↑</button>
      </div>
    </div>
    <div class="row">
      <div class="col mx-auto text-center mb-1">
        <button class="btn btn-secondary" type="button" id="backwardsABtn" @mousedown="motorsBackwards(NXTConstants.motors.PORT_A)" @mouseup="motorsStop(NXTConstants.motors.PORT_A)">↓</button>
      </div>
    </div>
  </div>
  
  <div class="col controllsB">
    <p>B</p>
    <div class="row">
      <div class="col mx-auto text-center mb-1">
        <button class="btn btn-secondary" type="button" id="forwardBBtn" @mousedown="motorsForwards(NXTConstants.motors.PORT_B)" @mouseup="motorsStop(NXTConstants.motors.PORT_B)">↑</button>
      </div>
    </div>
    <div class="row">
      <div class="col mx-auto text-center mb-1">
        <button class="btn btn-secondary" type="button" id="backwardsBBtn" @mousedown="motorsForwards(NXTConstants.motors.PORT_B)" @mouseup="motorsStop(NXTConstants.motors.PORT_B)">↓</button>
      </div>
    </div>
  </div>
  
  <div class="col controllsC">
    <p>C</p>
    <div class="row">
      <div class="col mx-auto text-center mb-1">
        <button class="btn btn-secondary" type="button" id="forwardCBtn" @mousedown="motorsForwards(NXTConstants.motors.PORT_C)" @mouseup="motorsStop(NXTConstants.motors.PORT_C)">↑</button>
      </div>
    </div>
    <div class="row">
      <div class="col mx-auto text-center mb-1">
        <button class="btn btn-secondary" type="button" id="backwardsCBtn" @mousedown="motorsForwards(NXTConstants.motors.PORT_C)" @mouseup="motorsStop(NXTConstants.motors.PORT_C)">↓</button>
      </div>
    </div>
  </div>
  
  </div>
  
  
  <div>
    <p>actions</p>
    <button class="btn btn-secondary" type="button" @click="changeLight(NXTConstants.sensorTypes.COLOR_RED)">light red</button>
    <button class="btn btn-secondary" type="button" @click="changeLight(NXTConstants.sensorTypes.COLOR_GREEN)">light green</button>
    <button class="btn btn-secondary" type="button" @click="changeLight(NXTConstants.sensorTypes.COLOR_BLUE)">light blue</button>
    <button class="btn btn-secondary" type="button" @click="changeLight(NXTConstants.sensorTypes.COLOR_FULL)">light all</button>
    <button class="btn btn-secondary" type="button" @click="changeLight(NXTConstants.sensorTypes.COLOR_NONE)">light none</button>
    <button class="btn btn-secondary" type="button" @click="beepHorn">horn</button>
  </div>
  `
}