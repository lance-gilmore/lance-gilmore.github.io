import { ref } from 'vue'
import ButtonControlComponent from './button_control_component.js'

export default {
    components: {
        ButtonControlComponent
      },
  setup() {
    return { NXTConstants }
  },

  template: `
    <ul class="nav nav-tabs" id="controlTabs" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="remote-control-tab" data-bs-toggle="tab" data-bs-target="#remote-control" type="button" role="tab" aria-controls="remote-control" aria-selected="true">Key Control</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="button-control-tab" data-bs-toggle="tab" data-bs-target="#button-control" type="button" role="tab" aria-controls="button-control" aria-selected="false">Button Control</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="code-control-tab" data-bs-toggle="tab" data-bs-target="#code-control" type="button" role="tab" aria-controls="code-control" aria-selected="false">Code Control</button>
  </li>
</ul>


<div class="tab-content" id="controlTabsContent">

  <div id="remote-control" class="tab-pane fade show active" role="tabpanel" aria-labelledby="remote-control-tab">
  </div>

  <div id="button-control" class="tab-pane fade" role="tabpanel" aria-labelledby="button-control-tab">
    <ButtonControlComponent/>
  </div>

  <div class="tab-pane fade" id="code-control" role="tabpanel" aria-labelledby="code-control-tab">
  </div>

</div>
  `
}