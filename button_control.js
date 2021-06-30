let buttonControlTemplate = `
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
    <button class="btn btn-secondary" type="button" id="redBtn">light red</button>
    <button class="btn btn-secondary" type="button" id="greenBtn">light green</button>
    <button class="btn btn-secondary" type="button" id="blueBtn">light blue</button>
    <button class="btn btn-secondary" type="button" id="allColourBtn">light all</button>
    <button class="btn btn-secondary" type="button" id="noColourBtn">light none</button>
    <button class="btn btn-secondary" type="button" id="hornBtn">horn</button>
  </div>
  
`;

$(function(){
  $('#button-control').append(buttonControlTemplate);
  
    $('#forwardABtn').mousedown(async function(){
    await forwardMotor(NXTConstants.motors.PORT_A);
  });
  $('#backwardsABtn').mousedown(async function(){
    await backwardMotor(NXTConstants.motors.PORT_A);
  });
  $('#forwardBBtn').mousedown(async function(){
    await forwardMotor(NXTConstants.motors.PORT_B);
  });
  $('#backwardsBBtn').mousedown(async function(){
    await backwardMotor(NXTConstants.motors.PORT_B);
  });
  $('#forwardCBtn').mousedown(async function(){
    await forwardMotor(NXTConstants.motors.PORT_C);
  });
  $('#backwardsCBtn').mousedown(async function(){
    await backwardMotor(NXTConstants.motors.PORT_C);
  });
  $('#forwardBtn').mousedown(async function(){
    await forwardMotor(NXTConstants.motors.PORT_B);
    await forwardMotor(NXTConstants.motors.PORT_C);
  });
  $('#backwardsBtn').mousedown(async function(){
    await backwardMotor(NXTConstants.motors.PORT_B);
    await backwardMotor(NXTConstants.motors.PORT_C);
  });
  $('#leftBtn').mousedown(async function(){
    await forwardMotor(NXTConstants.motors.PORT_B);
    await backwardMotor(NXTConstants.motors.PORT_C);
  });
  $('#rightBtn').mousedown(async function(){
    await forwardMotor(NXTConstants.motors.PORT_C);
    await backwardMotor(NXTConstants.motors.PORT_B);
  });
  $('.controlls .btn').mouseup(async function(){
    await stopMotor(NXTConstants.motors.PORT_B);
    await stopMotor(NXTConstants.motors.PORT_C);
  });
  $('.controllsA .btn').mouseup(async function(){
    await stopMotor(NXTConstants.motors.PORT_A);
  });
  $('.controllsB .btn').mouseup(async function(){
    await stopMotor(NXTConstants.motors.PORT_B);
  });
  $('.controllsC .btn').mouseup(async function(){
    await stopMotor(NXTConstants.motors.PORT_C);
  });
  
  $('#hornBtn').click(async function(){
    await simpleBeep();
  });
  $('#redBtn').click(async function(){
    await setInputModeColour(NXTConstants.sensorTypes.COLOR_RED,colourPort);
  });
  $('#greenBtn').click(async function(){
    await setInputModeColour(NXTConstants.sensorTypes.COLOR_GREEN,colourPort);
  });
  $('#blueBtn').click(async function(){
    await setInputModeColour(NXTConstants.sensorTypes.COLOR_BLUE,colourPort);
  });
  $('#allColourBtn').click(async function(){
    await setInputModeColour(NXTConstants.sensorTypes.COLOR_FULL,colourPort);
  });
  $('#noColourBtn').click(async function(){
    await setInputModeColour(NXTConstants.sensorTypes.COLOR_NONE,colourPort);
  });
});
