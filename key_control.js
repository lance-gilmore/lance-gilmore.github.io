  
  let rcTemplate = `
  <div class="row">
  <div class="col col-md-6">
    <p>assign keys</p>
    <label class="form-label" for="chooseConfig">Configuration</label>
      <select class="form-control" id="chooseConfig">
        <option>none</option>
      </select>
    
    <label>
      
      <a href="#" id="configInstructions" target="_blank">Instructions</a>
    </label>

    <div>
      <p>Config</p>
      <div id="configKeys"></div>
    </div>
    <!--
    <label>
      key
      <select>
        <option value="38">↑</option>
        <option value="40">↓</option>
        <option value="37">←</option>
        <option value="39">→</option>
        <option value="32">spacebar</option>
        <option>enter</option>
        <option>a</option>
        <option>b</option>
        <option>c</option>
        <option>d</option>
        <option>e</option>
        <option>f</option>
        <option>g</option>
        <option>h</option>
        <option>i</option>
        <option>j</option>
        <option>k</option>
        <option>l</option>
        <option>m</option>
        <option>n</option>
        <option>o</option>
        <option>p</option>
        <option>q</option>
        <option>r</option>
        <option>s</option>
        <option>t</option>
        <option>u</option>
        <option>v</option>
        <option>w</option>
        <option>x</option>
        <option>y</option>
        <option>z</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>0</option>
      </select>
    </label>
    <label>
      action
      <select>
        <option class="motor-single">Motor A</option>
        <option class="motor-single">Motor B</option>
        <option class="motor-single">Motor C</option>
        <option class="motor-double">Motor AB</option>
        <option class="motor-double">Motor AC</option>
        <option class="motor-double">Motor BC</option>
        <option class="light">Light</option>
      </select>
    </label>
    <label>
      colour
      <select>
        <option>red</option>
        <option>green</option>
        <option>blue</option>
        <option>all</option>
        <option>off</option>
      </select>
    </label>
    <label>
      direction
      <select>
        <option>forward</option>
        <option>backward</option>
        <option>forward backward</option>
        <option>backward forward</option>
      </select>
    </label>
    <label>
      speed %
      <input type="number" value="100">
    </label>
    <button type="button" class="btn btn-primary">Add</button>
    -->
    
  </div>
  
  </div>
  `;
  
  $(function(){
    $('#remote-control').append(rcTemplate);
    
    const valueKeyMap = {
      38:'↑',40:'↓',37:'←',39:'→',32:'spacebar',65:'a',66:'b',67:'c',68:'d',69:'e',70:'f',71:'g',72:'h',73:'i',74:'j',75:'k',76:'l',77:'m',78:'n',79:'o',80:'p',81:'q',82:'r',83:'s',84:'t',85:'u',86:'v',87:'w',88:'x',89:'y',90:'z',49:'1',50:'2',51:'3',52:'4',53:'5',54:'6',55:'7',56:'8',57:'9',48:'0'
    };
  
  for (const config of keyConfigs) {
    $('#chooseConfig').append('<option>'+config.name+'</option>');
  }
  $('#chooseConfig').change(function() {
    for (const config of keyConfigs) {
      if ($('#chooseConfig').val() === config.name) {
        setKeysFromConfig(config.config);
        //$('#configName').val(config.name);
        $('#configInstructions').attr('href',config.instructions);
        $('#configKeys').empty();
        for (const keyConfig of config.config) {
          $('#configKeys').append('<p>'+valueKeyMap[keyConfig.key]+' '+keyConfig.action+' '+keyConfig.direction+' '+keyConfig.speed+'</p>');
          
        }
      }
    }
  });
  
    function setKeysFromConfig(config) {
    let pushing = [];
    $('body').off();
    $('body').keyup(async function(event) {
        for (const keyConfig of config) {
            if (event.which == keyConfig.key) {
                event.preventDefault();
                pushing = pushing.filter(e => e !== event.which);
                if (keyConfig.action === 'motora' || keyConfig.action === 'motorab' || keyConfig.action === 'motorac') {
                    await stopMotor(NXTConstants.motors.PORT_A);
                }
                if (keyConfig.action === 'motorb' || keyConfig.action === 'motorab' || keyConfig.action === 'motorbc') {
                    await stopMotor(NXTConstants.motors.PORT_B);
                }
                if (keyConfig.action === 'motorc' || keyConfig.action === 'motorac' || keyConfig.action === 'motorbc') {
                    await stopMotor(NXTConstants.motors.PORT_C);
                }
            }
        }
    });

    $('body').keydown(async function(event) {
        if (pushing.includes(event.which)) {
          event.preventDefault();
          return;
        }
    
        for (const keyConfig of config) {
            if (event.which == keyConfig.key) {
                event.preventDefault();
                pushing.push(event.which);
                switch (keyConfig.action) {
                    case 'motora' :
                        await turnMotorSpeed(NXTConstants.motors.PORT_A,keyConfig.speed,(keyConfig.direction === 'forward'));
                        break;
                    case 'motorb' :
                        await turnMotorSpeed(NXTConstants.motors.PORT_B,keyConfig.speed,(keyConfig.direction === 'forward'));
                        break;
                    case 'motorc' :
                        await turnMotorSpeed(NXTConstants.motors.PORT_C,keyConfig.speed,(keyConfig.direction === 'forward'));
                        break;
                    case 'motorab' :
                        await turnMotorSpeed(NXTConstants.motors.PORT_A,keyConfig.speed,(keyConfig.direction === 'forward' || keyConfig.direction === 'forwardbackward'));
                        await turnMotorSpeed(NXTConstants.motors.PORT_B,keyConfig.speed,(keyConfig.direction === 'forward' || keyConfig.direction === 'backwardforward'));
                        break;
                    case 'motorac' :
                        await turnMotorSpeed(NXTConstants.motors.PORT_A,keyConfig.speed,(keyConfig.direction === 'forward' || keyConfig.direction === 'forwardbackward'));
                        await turnMotorSpeed(NXTConstants.motors.PORT_C,keyConfig.speed,(keyConfig.direction === 'forward' || keyConfig.direction === 'backwardforward'));
                        break;
                    case 'motorbc' :
                        await turnMotorSpeed(NXTConstants.motors.PORT_B,keyConfig.speed,(keyConfig.direction === 'forward' || keyConfig.direction === 'forwardbackward'));
                        await turnMotorSpeed(NXTConstants.motors.PORT_C,keyConfig.speed,(keyConfig.direction === 'forward' || keyConfig.direction === 'backwardforward'));
                        break;
                }
            }
        }
    });
  }
  
  
  });
  
