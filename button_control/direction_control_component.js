import NXTConstants from '../nxt/config.js'
import SimplifiedCommands from '../nxt/simplified_commands.js'

export default {
  
  setup() {
    return { NXTConstants }
  },
  props: {simpleCommands: {type: SimplifiedCommands, required: true}},
  methods: {
    async motorsForwards(motor1, motor2) {
        await this.simpleCommands.forwardMotor(motor1);
        if(typeof motor2 !== "undefined") {
            await this.simpleCommands.forwardMotor(motor2);
        }
    },
    async motorsBackwards(motor1, motor2) {
        await this.simpleCommands.backwardMotor(motor1);
        if(typeof motor2 !== "undefined") {
            await this.simpleCommands.backwardMotor(motor2);
        }
    },
    async motorsForwardsBackwards(motor1, motor2) {
        await this.simpleCommands.forwardMotor(motor1);
        await this.simpleCommands.backwardMotor(motor2);
    },
    async motorsStop (motor1, motor2) {
        await this.simpleCommands.stopMotor(motor1);
        if(typeof motor2 !== "undefined") {
            await this.simpleCommands.stopMotor(motor2);
        }
    }
  },
  template: `
<h3>Motors</h3>
<div class="row text-center">

  <div class="col">
    <p>BC</p>
    <div class="row">
      <div class="col mx-auto text-center mb-1">
        <button class="btn btn-secondary" type="button" @mousedown="motorsForwards(NXTConstants.motors.PORT_B, NXTConstants.motors.PORT_C)" @mouseup="motorsStop(NXTConstants.motors.PORT_B, NXTConstants.motors.PORT_C)">↑</button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button class="btn btn-secondary" type="button" @mousedown="motorsForwardsBackwards(NXTConstants.motors.PORT_B, NXTConstants.motors.PORT_C)" @mouseup="motorsStop(NXTConstants.motors.PORT_B, NXTConstants.motors.PORT_C)">←</button>
        <button class="btn btn-secondary mx-1" type="button" @mousedown="motorsBackwards(NXTConstants.motors.PORT_B, NXTConstants.motors.PORT_C)" @mouseup="motorsStop(NXTConstants.motors.PORT_B, NXTConstants.motors.PORT_C)">↓</button>
        <button class="btn btn-secondary" type="button" @mousedown="motorsForwardsBackwards(NXTConstants.motors.PORT_C, NXTConstants.motors.PORT_B)" @mouseup="motorsStop(NXTConstants.motors.PORT_B, NXTConstants.motors.PORT_C)">→</button>
      </div>
    </div>
  </div>
  
  <div class="col">
    <p>A</p>
    <div class="row">
      <div class="col mx-auto text-center mb-1">
        <button class="btn btn-secondary" type="button" @mousedown="motorsForwards(NXTConstants.motors.PORT_A)" @mouseup="motorsStop(NXTConstants.motors.PORT_A)">↑</button>
      </div>
    </div>
    <div class="row">
      <div class="col mx-auto text-center mb-1">
        <button class="btn btn-secondary" type="button" @mousedown="motorsBackwards(NXTConstants.motors.PORT_A)" @mouseup="motorsStop(NXTConstants.motors.PORT_A)">↓</button>
      </div>
    </div>
  </div>
  
  <div class="col">
    <p>B</p>
    <div class="row">
      <div class="col mx-auto text-center mb-1">
        <button class="btn btn-secondary" type="button" @mousedown="motorsForwards(NXTConstants.motors.PORT_B)" @mouseup="motorsStop(NXTConstants.motors.PORT_B)">↑</button>
      </div>
    </div>
    <div class="row">
      <div class="col mx-auto text-center mb-1">
        <button class="btn btn-secondary" type="button" @mousedown="motorsBackwards(NXTConstants.motors.PORT_B)" @mouseup="motorsStop(NXTConstants.motors.PORT_B)">↓</button>
      </div>
    </div>
  </div>
  
  <div class="col">
    <p>C</p>
    <div class="row">
      <div class="col mx-auto text-center mb-1">
        <button class="btn btn-secondary" type="button" @mousedown="motorsForwards(NXTConstants.motors.PORT_C)" @mouseup="motorsStop(NXTConstants.motors.PORT_C)">↑</button>
      </div>
    </div>
    <div class="row">
      <div class="col mx-auto text-center mb-1">
        <button class="btn btn-secondary" type="button" @mousedown="motorsBackwards(NXTConstants.motors.PORT_C)" @mouseup="motorsStop(NXTConstants.motors.PORT_C)">↓</button>
      </div>
    </div>
  </div>
  
</div>
  `
}