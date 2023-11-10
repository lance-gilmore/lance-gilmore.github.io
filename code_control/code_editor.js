export default {
  setup() {
    return { }
  },
  mounted() {
    const codeInput = document.querySelector('#code-input');
    const codeOutput = document.querySelector('#code-output');
  
    // initialise the highlighted output with whatever is in the input
    codeOutput.textContent = codeInput.value;
    hljs.highlightBlock(codeOutput);
  
    codeInput.addEventListener('input', (event) => {
      codeOutput.textContent = codeInput.value;
      hljs.highlightBlock(codeOutput);
    });
    
    codeInput.addEventListener('scroll', (event) => {
      codeOutput.scrollTop = codeInput.scrollTop;
      codeOutput.scrollLeft = codeInput.scrollLeft;
    });
  
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
          if (entry.target === codeInput) {
              // match the height and width of the output area to the input area
              codeOutput.style.height = (codeInput.offsetHeight) + 'px';
              codeOutput.style.width = (codeInput.offsetWidth) + 'px';
  
              // provide some padding in the output area to allow for any scroll bars or other decoration in the input area
              // offsetWidth/offsetHeight is the full width/height of the element
              // clientWidth/clientHeight is the width/height inside any decoration, like a scrollbar
              codeOutput.style.paddingRight = (codeInput.offsetWidth - codeInput.clientWidth) + 'px';
  
              codeOutput.style.paddingBottom = (codeInput.offsetHeight - codeInput.clientHeight) + 'px';
          }
      }
    });
  
    resizeObserver.observe(codeInput);
  },

  template: `
<fieldset class="editor">
    <textarea id="code-input" aria-controls="code-highlighter" class="input" autocapitalize="off" spellcheck="false"></textarea>
    <output id="code-output" role="status" class="highlighted-output javascript"></output>
</fieldset>
  `
}