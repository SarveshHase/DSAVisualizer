const stack = [];
const stackElement = document.querySelector('.stack-representation');
const valueInput = document.getElementById('value-input');
const pushButton = document.getElementById('push-btn');
const popButton = document.getElementById('pop-btn');
const messageBox = document.getElementById('message');
const speedControl = document.getElementById("speedControl");

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  let animationSpeed = 2;

function updateStackDisplay() {
  stackElement.innerHTML = '';
  for (let i = stack.length - 1; i >= 0; i--) {
    const element = document.createElement('div');
    element.classList.add('stack-element');
    element.textContent = stack[i];
    stackElement.appendChild(element);
  }
}
async function pushele(element){
    element.classList.add('push-animation');
    await sleep(animationSpeed*1000);
   element.classList.add('.stack-element');
}
async function push(value) {
  if (typeof value === 'string') {
    // Handle space-separated integers
    const values = value.trim().split(' ');
    for (const item of values) {
      if (item) { // Check for empty values after splitting
        stack.push(item);
        updateStackDisplay();
        const element = stackElement.querySelector(':first-child');
        valueInput.value = '';
        await pushele(element);
        setTimeout(() => element.classList.remove('push-animation'), 500);
      }
    }
  } else {
    // Handle single value
    stack.push(value);
    updateStackDisplay();
    const element = stackElement.querySelector(':first-child');
    valueInput.value = ''; // Clear input field after push
    await pushele(element);
    setTimeout(() => element.classList.remove('push-animation'), 500);
  }
  popButton.disabled = false;
  messageBox.textContent = ''; // Clear any previous messages
  document.querySelector("#message1").innerHTML=`Top = ${stack.length-1}`;
}

function popElementWithAnimation() {
    if (stack.length === 0) {
      messageBox.textContent = 'Stack is empty!';
      return;
    }
    const element = stackElement.querySelector(':first-child');
    element.classList.add('pop-animation'); // Apply animation class
  }
  
  function pop() {
    popElementWithAnimation();
    setTimeout(() => {
      const value = stack.pop();
      updateStackDisplay();
      if (stack.length === 0) {
        popButton.disabled = true;
      }
      messageBox.textContent = `Popped element: ${value}`;
      document.querySelector("#message1").innerHTML=`Top = ${stack.length-1}`;
    }, 500); // Delay removal by animation duration
  }
  
  

pushButton.addEventListener('click', () => {
  const value = valueInput.value.trim();
  if (value) {
    push(value);
  } else {
    messageBox.textContent = 'Please enter a value to push.';
  }
});

popButton.addEventListener('click', pop);
speedControl.addEventListener("input", () => {
    animationSpeed = 6 - speedControl.value;
  });

    