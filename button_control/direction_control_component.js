import { ref } from 'vue'

export default {
  
  setup() {
    return { NXTConstants }
  },
  methods: {
    async motorsForwards(motor1, motor2) {
        await forwardMotor(motor1);
        if(typeof motor2 !== "undefined") {
            await forwardMotor(motor2);
        }
    },
    async motorsBackwards(motor1, motor2) {
        await backwardMotor(motor1);
        if(typeof motor2 !== "undefined") {
            await backwardMotor(motor2);
        }
    },
    async motorsForwardsBackwards(motor1, motor2) {
        await forwardMotor(motor1);
        await backwardMotor(motor2);
    },
    async motorsStop (motor1, motor2) {
        await stopMotor(motor1);
        if(typeof motor2 !== "undefined") {
            await stopMotor(motor2);
        }
    }
  },
  template: `
<div class="row text-center">
  <h3>Motors</h3>

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