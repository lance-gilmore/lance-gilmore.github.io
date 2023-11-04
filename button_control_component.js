import { ref } from 'vue'

function changeLight(colour) {
    console.log(colour)
    //await setInputModeColour(colour,colourPort);
}

export default {
  setup() {
    const count = ref(0)
    return { count }
  },
  template: `<div>count is {{ count }}</div>
  
  <div class="row text-center">
  <div class="controlls col">
    <p>BC</p>
    <div class="row">
      <div class="col mx-auto text-center mb-1">
        <button class="btn btn-secondary" type="button" id="forwardBtn">↑</button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button class="btn btn-secondary" type="button" id="leftBtn">←</button>
        <button class="btn btn-secondary" type="button" id="backwardsBtn">↓</button>
        <button class="btn btn-secondary" type="button" id="rightBtn">→</button>
      </div>
    </div>
  </div>
  
  <div class="col controllsA">
    <p>A</p>
    <div class="row">
      <div class="col mx-auto text-center mb-1">
        <button class="btn btn-secondary" type="button" id="forwardABtn">↑</button>
      </div>
    </div>
    <div class="row">
      <div class="col mx-auto text-center mb-1">
        <button class="btn btn-secondary" type="button" id="backwardsABtn">↓</button>
      </div>
    </div>
  </div>
  
  <div class="col controllsB">
    <p>B</p>
    <div class="row">
      <div class="col mx-auto text-center mb-1">
        <button class="btn btn-secondary" type="button" id="forwardBBtn">↑</button>
      </div>
    </div>
    <div class="row">
      <div class="col mx-auto text-center mb-1">
        <button class="btn btn-secondary" type="button" id="backwardsBBtn">↓</button>
      </div>
    </div>
  </div>
  
  <div class="col controllsC">
    <p>C</p>
    <div class="row">
      <div class="col mx-auto text-center mb-1">
        <button class="btn btn-secondary" type="button" id="forwardCBtn">↑</button>
      </div>
    </div>
    <div class="row">
      <div class="col mx-auto text-center mb-1">
        <button class="btn btn-secondary" type="button" id="backwardsCBtn">↓</button>
      </div>
    </div>
  </div>
  
  
  </div>
  
  
  <div>
    <p>actions</p>
    <button class="btn btn-secondary" type="button" id="redBtn" @click="changeLight(NXTConstants.sensorTypes.COLOR_RED)">light red</button>
    <button class="btn btn-secondary" type="button" id="greenBtn" @click="changeLight(NXTConstants.sensorTypes.COLOR_GREEN)">light green</button>
    <button class="btn btn-secondary" type="button" id="blueBtn" @click="changeLight(NXTConstants.sensorTypes.COLOR_BLUE)">light blue</button>
    <button class="btn btn-secondary" type="button" id="allColourBtn" @click="changeLight(NXTConstants.sensorTypes.COLOR_FULL)">light all</button>
    <button class="btn btn-secondary" type="button" id="noColourBtn" @click="changeLight(NXTConstants.sensorTypes.COLOR_NONE)">light none</button>
    <button class="btn btn-secondary" type="button" id="hornBtn">horn</button>
  </div>
  `
}