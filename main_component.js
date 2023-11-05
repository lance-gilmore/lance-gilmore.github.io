import { ref } from 'vue'
import ButtonControlComponent from './button_control_component.js'
import KeyControlComponent from './key_control_component.js'
import CodeControlComponent from './code_control_component.js'

export default {
    components: {
        ButtonControlComponent,
        KeyControlComponent,
        CodeControlComponent
      },
  setup() {
    return { NXTConstants }
  },

  template: `
<ul class="nav nav-tabs" id="controlTabs" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="remote-control-tabs" data-bs-toggle="tab" data-bs-target="#remote-controls" type="button" role="tab" aria-controls="remote-controls" aria-selected="true">Key Control</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="button-control-tabs" data-bs-toggle="tab" data-bs-target="#button-controls" type="button" role="tab" aria-controls="button-controls" aria-selected="false">Button Control</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="code-control-tasb" data-bs-toggle="tab" data-bs-target="#code-controls" type="button" role="tab" aria-controls="code-controls" aria-selected="false">Code Control</button>
  </li>
</ul>

<div class="tab-content" id="controlTabsContent">

  <div id="remote-controls" class="tab-pane fade show active" role="tabpanel" aria-labelledby="remote-control-tabs">
  <KeyControlComponent/>
  </div>

  <div id="button-controls" class="tab-pane fade" role="tabpanel" aria-labelledby="button-control-tabs">
    <ButtonControlComponent/>
  </div>

  <div class="tab-pane fade" id="code-controls" role="tabpanel" aria-labelledby="code-control-tabs">
  <CodeControlComponent/>
  </div>

</div>
  `
}